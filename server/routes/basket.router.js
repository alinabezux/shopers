const basketController = require('../controllers/basket.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const userMiddleware = require('../middlewares/user.middleware');

const basketRouter = require('express').Router();

basketRouter.get('/:userId',
    userMiddleware.checkIfUserExists,
    authMiddleware.checkAccessToken,
    basketController.getUsersBasket
);

basketRouter.post('/:userId/:productId',
    userMiddleware.checkIfUserExists,
    authMiddleware.checkAccessToken,
    basketController.addToBasket);

basketRouter.delete('/:userId/:productId',
    authMiddleware.checkAccessToken,
    userMiddleware.checkIfUserExists,
    basketController.deleteFromBasket);

module.exports = basketRouter;