const OAuth = require("../db/models/OAuth");
const User = require("../db/models/User");
const ApiError = require("../errors/ApiError");
const OAuthService = require("../services/OAuthService");
const authValidator = require('../validators/auth.validator');

module.exports = {
    checkLogInBody: async (req, res, next) => {
        try {
            const validate = authValidator.logInValidator.validate(req.body.user);

            if (validate.error) {
                throw new ApiError(401, 'Неправильний email або пароль.')
            }

            req.body = validate.value;

            next();
        } catch (e) {
            next(e);
        }
    },
    checkAccessToken: async (req, res, next) => {
        try {
            const authorizationString = req.headers.authorization;
            console.log(req.headers.authorization);

            if (!authorizationString) {
                throw new ApiError(401, 'Користувач не авторизований.');
            }

            const parts = authorizationString.split(" ");
            if (parts.length !== 2 || parts[0] !== 'Bearer') {
                throw new ApiError(401, 'Невірний формат токену.');
            }

            const accessToken = parts[1];
            const tokenInfo = await OAuth.findOne({ accessToken });

            if (!tokenInfo) {
                throw new ApiError(401, 'Токен не дійсний.')
            }
            const decoded = OAuthService.checkToken(accessToken);

            req.tokenInfo = tokenInfo;
            req.decoded = decoded;

            next();
        } catch (e) {
            next(e);
        }
    },
    isRightUser: async (req, res, next) => {
        try {
            const { id } = req.decoded;
            const { userId } = req.params;

            if (id !== userId) {
                throw new ApiError(403, 'Немає доступу.');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRole: async (req, res, next) => {
        try {
            const { id } = req.decoded

            const user = await User.findById(id);

            if (!user || user.isAdmin !== true) {
                throw new ApiError(403, 'Немає доступу.');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const { refreshToken } = req.cookies;

            if (!refreshToken) {
                throw new ApiError(401, 'Немає токену.');
            }

            OAuthService.checkToken(refreshToken, 'refreshToken');
            const tokenInfo = await OAuth.findOne({ refreshToken });

            if (!tokenInfo) {
                throw new ApiError(401, 'Користувач не авторизований.')
            }

            req.tokenInfo = tokenInfo;

            next();
        } catch (e) {
            next(e);
        }
    },
}