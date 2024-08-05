const typeRouter = require('express').Router();
const typeController = require('../controllers/type.controller');
const authMiddleware = require('../middlewares/auth.middleware');

typeRouter.get('/', typeController.getAllTypes)
typeRouter.get('/:categoryId', typeController.getTypesByCategoryId)

typeRouter.post('/',
    authMiddleware.checkAccessToken,
    authMiddleware.checkRole,
    typeController.createType)

typeRouter.put('/:typeId',
    authMiddleware.checkAccessToken,
    authMiddleware.checkRole,
    typeController.updateType)

typeRouter.delete('/:typeId',
    authMiddleware.checkAccessToken,
    authMiddleware.checkRole,
    typeController.deleteType)


module.exports = typeRouter;