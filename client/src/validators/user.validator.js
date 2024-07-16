import Joi from 'joi'

const userValidator = {
    newUserValidator: Joi.object({
        name: Joi.string().min(2).max(20).required().messages({
            'string.min': 'Ім\'я повинне складатися з 2 і більше символів.',
            'string.max': 'Ім\'я повинне містити не більше 20 символів.',
            'string.empty': 'Ім\'я є обов\'язковим полем!',
        }),
        email: Joi.string().regex(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/).lowercase().trim().required().messages({
            'string.pattern.base': 'Email повинен складатися з англійських літер та містити "@" і "."',
            'string.empty': 'Email є обов\'язковим полем!',
        }),
        password: Joi.string().regex(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/).required().messages({
            'string.pattern.base': 'Ваш пароль повинен містити не менше 6-ти символів,літери великого та малого регістру і цифри.',
            'string.empty': 'Пароль є обов\'язковим полем!',
        }),
        confirmPassword: Joi.string().required().messages({
            'string.empty': 'Підтверіть пароль!'
        })
    })
}

export { userValidator }