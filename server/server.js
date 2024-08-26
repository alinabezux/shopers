const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const crypto = require('crypto');
const fileUpload = require('express-fileupload');
const cors = require('cors');
mongoose.set('strictQuery', false);
require('dotenv').config();

const ApiError = require('./errors/ApiError');
const configs = require('./configs/configs');
const router = require('./routes');
const Order = require('./db/models/Order');


let app = express();

app.use(cookieParser());
app.use(bodyParser.json());

app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
    origin: configs.CLIENT_URL,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Token', 'X-Sign']
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(fileUpload());
app.use('/api', router)

const pubKeyBase64 = "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUZrd0V3WUhLb1pJemowQ0FRWUlLb1pJemowREFRY0RRZ0FFc05mWXpNR1hIM2VXVHkzWnFuVzVrM3luVG5CYgpnc3pXWnhkOStObEtveDUzbUZEVTJONmU0RlBaWmsvQmhqamgwdTljZjVFL3JQaU1EQnJpajJFR1h3PT0KLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg==";

app.post('/api/payment/status', async (req, res, next) => {
    try {
        const message = JSON.stringify(req.body);

        const xSignBase64 = req.headers['x-sign'];

        console.log('Received webhook:', req.body);
        console.log('X-Sign Header:', req.headers['x-sign']);

        if (!xSignBase64) {
            return res.status(400).send('Missing X-Sign header');
        }

        const signatureBuf = Buffer.from(xSignBase64, 'base64');
        const publicKeyBuf = Buffer.from(pubKeyBase64, 'base64');

        const verify = crypto.createVerify('SHA256');
        verify.update(message); // використовуємо update замість write
        verify.end();

        const isValidSignature = verify.verify(publicKeyBuf, signatureBuf);

        if (!isValidSignature) {
            return res.status(400).send('Invalid signature');
        }

        const { reference, status, modifiedDate } = req.body;
        const order = await Order.findOne({ 'orderID': reference });

        if (order) {
            // Оновлюємо статус замовлення тільки якщо новий статус має новіші дані
            if (new Date(modifiedDate) > new Date(order.modifiedDate)) {
                order.paymentStatus = status;
                order.modifiedDate = modifiedDate; // оновлюємо дату модифікації
                await order.save();
            }
        }

        res.status(200).json({ message: 'Status updated successfully' });
    } catch (error) {
        next(error);
    }
});



app.get('/', (req, res) => {
    res.json('WELCOME:)')
})

app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        res.status(err.status).json({ message: err.message });
    } else {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(configs.PORT, configs.HOST, async () => {
    await mongoose.connect(configs.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log(`Backend server is running on port ${configs.PORT} !`);
})