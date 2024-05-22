const categoryRouter = require('express').Router();
const categoryController = require('../controllers/category.controller');

categoryRouter.get('/', categoryController.getAllCategories)
categoryRouter.post('/', categoryController.createCategory)
categoryRouter.put('/:categoryId', categoryController.uploadImage)
categoryRouter.get('/:categoryId', categoryController.getCategoryById)
categoryRouter.put('/:categoryId', categoryController.updateCategory)
categoryRouter.delete('/:categoryId', categoryController.deleteCategory)


module.exports = categoryRouter;