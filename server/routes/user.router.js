const userRouter = require('express').Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const userMiddleware = require('../middlewares/user.middleware');

userRouter.post('/register',
    userMiddleware.isNewUserValid,
    userMiddleware.checkIsEmailUnique,
    userController.createUser);

userRouter.get('/',
    authMiddleware.checkAccessToken,
    authMiddleware.checkRole,
    userController.getAllUsers);

userRouter.get('/:userId',
    userMiddleware.checkIfUserExists,
    authMiddleware.checkAccessToken,
    authMiddleware.isRightUser,
    userController.getUserById);

module.exports = userRouter;