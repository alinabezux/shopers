const crypto = require('crypto');
const Order = require('../db/models/Order');
const User = require('../db/models/User');
const Product = require('../db/models/Product');

module.exports = {
    getStatusWebHook: async (req, res, next) => {
        try {
            console.log('Контролер викликано');
            const message = JSON.stringify(req.body);
            const xSignBase64 = req.headers['x-sign'];
            const pubKeyBase64 = "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUZrd0V3WUhLb1pJemowQ0FRWUlLb1pJemowREFRY0RRZ0FFc05mWXpNR1hIM2VXVHkzWnFuVzVrM3luVG5CYgpnc3pXWnhkOStObEtveDUzbUZEVTJONmU0RlBaWmsvQmhqamgwdTljZjVFL3JQaU1EQnJpajJFR1h3PT0KLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg==";

            // console.log('Received webhook:', req.body);
            // console.log('X-Sign Header:', req.headers['x-sign']);

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
                if (new Date(modifiedDate) > new Date(order.updatedAt)) {
                    order.paymentStatus = status;
                    order.updatedAt = modifiedDate; // оновлюємо дату модифікації
                    await order.save();
                }

                if (status === 'success') {
                    let bonusUpdate;
                    const user = await User.findById(order._user)

                    if (order.useBonus === true) {
                        bonusUpdate = User.findByIdAndUpdate(order._user, { bonus: order.cashback }, { new: true });
                    } else {
                        const newBonus = user.bonus + order.cashback;
                        bonusUpdate = User.findByIdAndUpdate(order._user, { bonus: newBonus }, { new: true });
                    }

                    const productUpdates = order.orderItems.map(item =>
                        Product.findByIdAndUpdate(
                            item._productId,
                            { $inc: { quantity: -item.quantity } },
                            { new: true }
                        )
                    );

                    await Promise.all([bonusUpdate, ...productUpdates]);
                }
            }

            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            res.status(200).json({ message: 'Status updated successfully' });
        } catch (error) {
            console.error('Помилка в контролері:', error);
            next(error);
        }
    }
}