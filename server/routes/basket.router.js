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

basketRouter.patch('/:userId/:productId',
    userMiddleware.checkIfUserExists,
    authMiddleware.checkAccessToken,
    basketController.changeProductQuantity);

basketRouter.delete('/:userId/:productId',
    userMiddleware.checkIfUserExists,
    authMiddleware.checkAccessToken,
    basketController.deleteFromBasket);

module.exports = basketRouter;