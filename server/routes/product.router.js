const productRouter = require('express').Router();
const productController = require('../controllers/product.controller');

productRouter.post('/', productController.createProduct);
productRouter.get('/', productController.getAllProducts);
productRouter.get('/:productId', productController.getProductById);
productRouter.get('/', productController.getProductByArticle);
productRouter.put('/:productId', productController.updateProduct);
productRouter.delete('/:productId', productController.deleteProduct);

module.exports = productRouter;