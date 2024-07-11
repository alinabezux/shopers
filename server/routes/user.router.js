const userRouter = require('express').Router();
const userController = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middleware');

userRouter.post('/register',
    userMiddleware.isNewUserValid,
    userMiddleware.checkIsEmailUnique,
    userController.createUser);
    
userRouter.get('/', userController.getAllUsers);

module.exports = userRouter;