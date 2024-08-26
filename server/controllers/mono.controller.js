const crypto = require('crypto');
const Order = require('../db/models/Order');

module.exports = {
    getStatusWebHook: async (req, res, next) => {
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

            // if (order) {
            //     // Оновлюємо статус замовлення тільки якщо новий статус має новіші дані
            //     if (new Date(modifiedDate) > new Date(order.modifiedDate)) {
            //         order.paymentStatus = status;
            //         order.modifiedDate = modifiedDate; // оновлюємо дату модифікації
            //         await order.save();
            //     }
            // }

            res.status(200).json({ message: 'Status updated successfully' });
        } catch (error) {
            next(error);
        }
    }
}