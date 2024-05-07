const productRouter = require('express').Router();
const productController = require('../controllers/product.controller');

productRouter.post('/', productController.createProduct);

module.exports = productRouter;