const {Schema, model} = require('mongoose');

const orderSchema = new Schema({
        _user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        number: {type: Number, required: true},
        email: {type: String, required: true},
        orderItems: [{type: String, required: true}],
        shipping: {type: String, default: "Доставка кур'єром", required: true,},
        city: String,
        address: String,
        status: {type: String, required: true, default: "Нове"},
        paymentMethod: {type: String, default: "Оплата при отриманні", required: true},
        totalPrice: {type: Number, required: true},
    },
    {timestamps: true}
)
module.exports = model('Order', orderSchema)