const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const userMiddleware = require('../middlewares/user.middleware');
const authRouter = require('express').Router();

authRouter.post('/logIn',
    authMiddleware.checkLogInBody,
    userMiddleware.getUserByEmail,
    authController.logIn);

authRouter.post('/refresh',
    authMiddleware.checkRefreshToken,
    authController.refresh);
    
authRouter.post('/logOut',
    authMiddleware.checkAccessToken,
    authController.logOut);

module.exports = authRouter;