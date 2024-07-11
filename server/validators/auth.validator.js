const Joi = require("joi");

const regexp = require("../configs/regexp.enum");

module.exports = {
    logInValidator: Joi.object({
        email: Joi.string().regex(regexp.EMAIL).lowercase().trim().required(),
        password: Joi.string().regex(regexp.PASSWORD).required()
    })
}