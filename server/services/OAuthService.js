const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const ApiError = require("../errors/ApiError")
const { ACCESS_SECRET, REFRESH_SECRET } = require("../configs/configs")
const OAuth = require("../db/models/OAuth");

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),
    comparePasswords: async (password, hashPassword) => {
        const isPasswordsSame = await bcrypt.compare(password, hashPassword);

        if (!isPasswordsSame) {
            throw new ApiError(409, 'Неправильний email або пароль.');
        }
    },
    generateTokenPair: (dataToSign = {}) => {
        const accessToken = jwt.sign(dataToSign, ACCESS_SECRET, { expiresIn: '1m' });
        const refreshToken = jwt.sign(dataToSign, REFRESH_SECRET, { expiresIn: '3m' });

        return {
            accessToken,
            refreshToken
        }
    },
    saveTokens: async (userId, tokenPair) => {
        let info = await OAuth.findOne({ _user: userId })

        if (info) {
            info.accessToken = tokenPair.accessToken;
            info.refreshToken = tokenPair.refreshToken;
            await info.save();
        } else {
            info = await OAuth.create({ _user: userId, ...tokenPair });
        }

        return info;

    },
    checkToken: (token, tokenType = 'accessToken') => {
        try {
            let secret = '';

            if (tokenType === 'accessToken') secret = ACCESS_SECRET
            else if (tokenType === 'refreshToken') secret = REFRESH_SECRET

            return jwt.verify(token, secret);

        } catch (e) {
            if (tokenType === 'refreshToken') {
                throw new ApiError(401, 'Рефреш токен не дійсний.')
            } else throw new ApiError(401, 'аксес токен не дійсний.')
        }
    },
}