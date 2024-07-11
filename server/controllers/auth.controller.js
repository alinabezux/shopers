const OAuth = require("../db/models/OAuth");
const OAuthService = require("../services/OAuthService");

module.exports = {
    logIn: async (req, res, next) => {
        try {
            const { user, body } = req;
          
            await OAuthService.comparePasswords(user.password, body.password);

            const tokenPair = OAuthService.generateTokenPair({ id: user._id });

            await OAuth.create({ _user: user._id, ...tokenPair })

            res.json({ _user: user._id, ...tokenPair });
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const { refreshToken, _user } = req.tokenInfo;
            console.log(`refreshToken, _user  refresh: ${refreshToken} ${_user}`);

            await OAuth.deleteOne({ refreshToken });

            const tokenPair = OAuthService.generateTokenPair({ id: _user });

            await OAuth.create({ _user, ...tokenPair })

            res.status(201).json({ ...tokenPair });
        } catch (e) {
            next(e);
        }
    },

    logOut: async (req, res, next) => {
        try {
            const { accessToken } = req.tokenInfo;
            console.log(`accessToken logOut: ${accessToken}`);

            await OAuth.deleteOne({ accessToken });

            res.sendStatus(204);    
        } catch (e) {
            next(e);
        }
    }
}