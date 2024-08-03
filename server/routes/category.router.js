const categoryRouter = require('express').Router();
const categoryController = require('../controllers/category.controller');

categoryRouter.get('/', categoryController.getAllCategories)
categoryRouter.post('/', categoryController.createCategory)
categoryRouter.put('/:categoryId', categoryController.updateCategory)
categoryRouter.patch('/:categoryId', categoryController.uploadImage)
categoryRouter.delete('/:categoryId', categoryController.deleteCategory)

categoryRouter.get('/:categoryId', categoryController.getCategoryById)

module.exports = categoryRouter;