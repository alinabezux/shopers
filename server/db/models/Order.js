const { Schema, model } = require('mongoose');
const { CARD, NOVAPOST } = require('../../configs/order.enum');

const generateSixDigitId = () => {
    const randomNum = Math.floor(100000 + Math.random() * 900000).toString()
    return `ID-${randomNum}`;
};

const orderSchema = new Schema({
    orderID: { type: String, required: true, unique: true, default: generateSixDigitId },
    _user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [{ type: String, required: true }],
    shipping: { type: String, default: NOVAPOST, required: true, },

    // deliveryInfo
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },

    city: {
        ref: { type: String },
        description: { type: String },
    },
    warehouse: {
        ref: { type: String },
        index: { type: String },
        number: { type: String },
        description: { type: String }
    },

    cityUKR: { type: String },
    index: { type: String },
    region: { type: String },
    //

    email: { type: String, required: true },
    paymentMethod: { type: String, default: CARD, required: true },
    totalSum: { type: Number, required: true },
    status: { type: String, required: true, default: "Нове" },
},
    { timestamps: true }
)
module.exports = model('Order', orderSchema)