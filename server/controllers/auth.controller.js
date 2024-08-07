const OAuth = require("../db/models/OAuth");
const OAuthService = require("../services/OAuthService");

module.exports = {
    logIn: async (req, res, next) => {
        try {
            const { user, body } = req;
            await OAuthService.comparePasswords(body.password, user.password,);
            const tokenPair = OAuthService.generateTokenPair({ id: user._id });

            const info = await OAuthService.saveTokens(user._id, tokenPair)

            res.cookie('refreshToken', info.refreshToken, { maxAge: 10 * 60 * 1000 })
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

            res.cookie('refreshToken', newInfo.refreshToken, { maxAge: 10 * 60 * 1000 })
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
    }
}