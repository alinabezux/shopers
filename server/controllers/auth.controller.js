const OAuth = require("../db/models/OAuth");
const OAuthService = require("../services/OAuthService");

module.exports = {
    logIn: async (req, res, next) => {
        try {
            const { user, body } = req;
            await OAuthService.comparePasswords(body.password, user.password,);
            const tokenPair = OAuthService.generateTokenPair({ id: user._id });

            const info = await OAuthService.saveTokens(user._id, tokenPair)

            res.cookie('refreshToken', info.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.status(200).json(info);

        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const { _user } = req.tokenInfo;

            const tokenPair = OAuthService.generateTokenPair({ id: _user });
            const info = await OAuthService.saveTokens(_user, tokenPair)

            res.cookie('refreshToken', info.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.status(200).json(info);
        } catch (e) {
            next(e);
        }
    },

    logOut: async (req, res, next) => {
        try {
            const { refreshToken } = req.cookies;

            await OAuth.deleteOne({ refreshToken });
            res.clearCookie('refreshToken');
            return res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }
}