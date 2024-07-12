const OAuth = require("../db/models/OAuth");
const ApiError = require("../errors/ApiError");
const OAuthService = require("../services/OAuthService");
const authValidator = require('../validators/auth.validator');

module.exports = {
    checkLogInBody: async (req, res, next) => {
        try {
            const validate = authValidator.logInValidator.validate(req.body);

            if (validate.error) {
                throw new ApiError(409, 'Неправильний email або пароль.')
            }
            next();

        } catch (e) {
            next(e);
        }
    },
    checkAccessToken: async (req, res, next) => {
        try {
            const authorizationString = req.get('Authorization');

            if (!authorizationString) {
                throw new ApiError(401, 'Користувач не авторизований.');
            }

            const accessToken = authorizationString.split(" ")[1]

            const decoded = OAuthService.checkToken(accessToken);

            const tokenInfo = await OAuth.findOne({ accessToken });

            if (!tokenInfo) {
                throw new ApiError(401, 'Токен не дійсний.')
            }

            if (decoded.id !== req.params.userId) {
                throw new ApiError(401, 'Немає доступу.');
            }

            req.tokenInfo = tokenInfo;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const refreshString = req.body.refresh;

            if (!refreshString) {
                throw new ApiError(401, 'Немає токену.');
            }
            const refreshToken = refreshString

            OAuthService.checkToken(refreshToken, 'refreshToken');
            const tokenInfo = await OAuth.findOne({ refreshToken });


            if (!tokenInfo) {
                throw new ApiError(401, 'Токен не дійсний.')
            }

            req.tokenInfo = tokenInfo;

            next();
        } catch (e) {
            next(e);
        }
    },
}