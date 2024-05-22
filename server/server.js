const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const cors = require('cors');
mongoose.set('strictQuery', false);
require('dotenv').config();

const configs = require('./configs/configs');
const router = require('./routes')

let app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(fileUpload());
app.use('/api', router)

app.get('/', (req, res) => {
    res.json('WELCOME:)')
})

app.listen(configs.PORT, configs.HOST, async () => {
    await mongoose.connect(configs.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log(`Backend server is running on port ${configs.PORT} !`);
})