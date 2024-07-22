const OAuth = require("../db/models/OAuth");
const ApiError = require("../errors/ApiError");
const OAuthService = require("../services/OAuthService");
const authValidator = require('../validators/auth.validator');

module.exports = {
    checkLogInBody: async (req, res, next) => {
        try {
            const validate = authValidator.logInValidator.validate(req.body.user);

            if (validate.error) {
                throw new ApiError(409, 'Неправильний email або пароль.')
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

            if (!authorizationString) {
                throw new ApiError(401, 'Користувач не авторизований.');
            }

            const accessToken = authorizationString.split(" ")[1]

            const tokenInfo = await OAuth.findOne({ accessToken });

            if (!tokenInfo) {
                throw new ApiError(401, 'Токен не дійсний.')
            }
            const decoded = OAuthService.checkToken(accessToken);

            if (decoded.id !== req.params.userId) {
                throw new ApiError(401, 'Немає доступу.');
            }
            console.log('Підтверджено')
            req.tokenInfo = tokenInfo;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const { refreshToken } = req.cookies;
            console.log(req.cookies)
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