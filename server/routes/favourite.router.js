const favouriteController = require('../controllers/favourite.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const userMiddleware = require('../middlewares/user.middleware');

const favouriteRouter = require('express').Router();


favouriteRouter.get('/:userId',
    userMiddleware.checkIfUserExists,
    authMiddleware.checkAccessToken,
    favouriteController.getUsersFavourite
);

favouriteRouter.post('/:userId/:productId',
    userMiddleware.checkIfUserExists,
    authMiddleware.checkAccessToken,
    favouriteController.addToFavourite
);

favouriteRouter.delete('/:userId/:productId',
    userMiddleware.checkIfUserExists,
    authMiddleware.checkAccessToken,
    favouriteController.deleteFromFavourite
);

module.exports = favouriteRouter;
