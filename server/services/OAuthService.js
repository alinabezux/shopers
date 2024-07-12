const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const ApiError = require("../errors/ApiError")
const { ACCESS_SECRET, REFRESH_SECRET } = require("../configs/configs")

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),
    comparePasswords: async (hashPassword, password) => {
        const isPasswordsSame = await bcrypt.compare(password, hashPassword);

        if (!isPasswordsSame) {
            throw new ApiError(409, 'Неправильний email або пароль.');
        }
    },
    generateTokenPair: (dataToSign = {}) => {
        const accessToken = jwt.sign(dataToSign, ACCESS_SECRET, { expiresIn: '1d' });
        const refreshToken = jwt.sign(dataToSign, REFRESH_SECRET, { expiresIn: '30d' });

        return {
            accessToken,
            refreshToken
        }
    },

    checkToken: (token, tokenType = 'accessToken') => {
        try {
            let secret = '';

            if (tokenType === 'accessToken') secret = ACCESS_SECRET
            else if (tokenType === 'refreshToken') secret = REFRESH_SECRET

            return jwt.verify(token, secret);
        } catch (e) {
            throw new ApiError(401, 'Токен не дійсний.')
        }
    },
}