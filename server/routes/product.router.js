const productRouter = require('express').Router();
const productController = require('../controllers/product.controller');

productRouter.get('/', productController.getAllProducts);
productRouter.get('/:productId', productController.getProductById);
productRouter.post('/', productController.createProduct);
productRouter.put('/:productId', productController.updateProduct);
productRouter.patch('/:productId', productController.uploadImage);
productRouter.delete('/:productId', productController.deleteProduct);
productRouter.delete('/:productId/images', productController.deleteImage);

module.exports = productRouter;