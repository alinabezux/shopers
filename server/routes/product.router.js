const productRouter = require('express').Router();
const productController = require('../controllers/product.controller');

productRouter.get('/', productController.getAllProducts);
productRouter.get('/:productId', productController.getProductById);
productRouter.post('/', productController.createProduct);
productRouter.put('/:productId', productController.updateProduct);
productRouter.delete('/:productId', productController.deleteProduct);

productRouter.put('/:productId', productController.uploadImage);

module.exports = productRouter;