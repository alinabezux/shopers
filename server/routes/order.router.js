const orderController = require('../controllers/order.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const userMiddleware = require('../middlewares/user.middleware');

const orderRouter = require('express').Router();

orderRouter.post('/:userId',
    // authMiddleware.checkAccessToken,
    // userMiddleware.checkIfUserExists,
    orderController.createOrder)

orderRouter.get('/',
    // authMiddleware.checkAccessToken,
    // userMiddleware.checkIfUserExists,
    orderController.getAllOrders)

module.exports = orderRouter;