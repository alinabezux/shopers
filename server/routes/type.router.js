const typeRouter = require('express').Router();
const typeController = require('../controllers/type.controller');

typeRouter.post('/', typeController.createType)
typeRouter.get('/', typeController.getAllTypes)
typeRouter.get('/:categoryId', typeController.getTypesByCategoryId)
typeRouter.put('/:typeId', typeController.updateType)
typeRouter.delete('/:typeId', typeController.deleteType)


module.exports = typeRouter;