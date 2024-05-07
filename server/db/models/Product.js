const {Schema, model} = require('mongoose');

const productSchema = new Schema({
    article: {type: String, required: true, unique: true},
    name: {type: String, required: true, unique: true},
    images: Array,
    _category: {type: Schema.Types.ObjectId, ref: 'Category', required: true},
    _type: {type: Schema.Types.ObjectId, ref: 'Type'},
    info: {
        color: String,
        size: String,
        material: String,
        description: String
    },
    quantity: {type: Number, required: true, default: 1},
    price: {type: Number, required: true},
    cashback: {type: Number, required: true}
})

module.exports = model('Product', productSchema)