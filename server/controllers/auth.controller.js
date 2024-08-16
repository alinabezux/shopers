const { CLIENT_URL } = require("../configs/configs");
const { FORGOT_PASSWORD_ACTION_ENUM } = require("../configs/tokenActions.enum");
const ActionToken = require("../db/models/ActionToken");
const OAuth = require("../db/models/OAuth");
const User = require("../db/models/User");
const { FORGOT_PASSWORD } = require("../email-templates/email-actions.enum");
const OAuthService = require("../services/OAuthService");
const emailService = require('../services/email.service')

module.exports = {
    logIn: async (req, res, next) => {
        try {
            const { user, body } = req;
            await OAuthService.comparePasswords(body.password, user.password,);
            const tokenPair = OAuthService.generateTokenPair({ id: user._id });

            const info = await OAuthService.saveTokens(user._id, tokenPair)

            res.cookie('refreshToken', info.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000 })
            res.status(200).json(info);

        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const { _user } = req.tokenInfo;
            console.log(`_user - ${_user}`);

            const tokenPair = OAuthService.generateTokenPair({ id: _user });
            const newInfo = await OAuthService.saveTokens(_user, tokenPair)
            console.log(newInfo);

            res.cookie('refreshToken', newInfo.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000 })
            res.status(200).json(newInfo);
        } catch (e) {
            next(e);
        }
    },

    logOut: async (req, res, next) => {
        try {
            const { refreshToken } = req.cookies;
            await OAuth.deleteOne({ refreshToken });
            res.clearCookie('refreshToken');
            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },
    forgotPassword: async (req, res, next) => {
        try {
            const user = req.user;

            const actionToken = OAuthService.generateActionToken(FORGOT_PASSWORD_ACTION_ENUM, { email: user.email });
            const forgotPassFEUrl = `${CLIENT_URL}/password/new?token=${actionToken}`

            await ActionToken.create({ token: actionToken, _user: user._id, tokenType: FORGOT_PASSWORD_ACTION_ENUM });

            await emailService.sendEmail(user.email, FORGOT_PASSWORD, { url: forgotPassFEUrl });

            res.status(200).json('Посилання для відновлення паролю надіслано на пошту.');

        } catch (e) {
            next(e);
        }

    },
    setNewPassword: async (req, res, next) => {
        try {
            const user = req.user;
            console.log(`user`);
            console.log(user);

            const body = req.body;
            console.log(`body`);
            console.log(body);

            const hashPassword = await OAuthService.hashPassword(body.newPassword);
            console.log(`hashPassword`);
            console.log(hashPassword);

            await ActionToken.deleteOne({ token: req.get('Authorization') });
            await User.findByIdAndUpdate(user._id, { password: hashPassword }, { new: true });

            res.status(200).json('Пароль успішно змінено.');
        } catch (e) {
            next(e);
        }
    }

}