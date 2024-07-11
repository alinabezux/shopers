const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    bonus: { type: Number, required: true, default: 10 }
},
    { timestamps: true }
)

module.exports = model('User', userSchema);