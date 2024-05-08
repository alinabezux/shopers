const {Schema, model} = require('mongoose');

const categorySchema = new Schema({
    name: {type: String, required: true, unique: true},
    image: String,
    // types: [{ type: Schema.Types.ObjectId, ref: 'Type' }]
})

module.exports = model('Category', categorySchema);