const categoryRouter = require('express').Router();
const categoryController = require('../controllers/category.controller');

categoryRouter.post('/', categoryController.createCategory)
categoryRouter.get('/', categoryController.getAllCategories)
categoryRouter.get('/:categoryId', categoryController.getCategoryById)
categoryRouter.put('/:categoryId', categoryController.updateCategory)
categoryRouter.delete('/:categoryId', categoryController.deleteCategory)


module.exports = categoryRouter;