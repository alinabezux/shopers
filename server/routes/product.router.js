const productRouter = require('express').Router();
const productController = require('../controllers/product.controller');
const authMiddleware = require('../middlewares/auth.middleware');

productRouter.get('/', productController.getAllProducts);
productRouter.get('/:productId', productController.getProductById);

productRouter.post('/',
    authMiddleware.checkAccessToken,
    authMiddleware.checkRole,
    productController.createProduct);

productRouter.put('/:productId',
    authMiddleware.checkAccessToken,
    authMiddleware.checkRole,
    productController.updateProduct);

productRouter.patch('/:productId',
    authMiddleware.checkAccessToken,
    authMiddleware.checkRole,
    productController.uploadImage);

productRouter.delete('/:productId',
    authMiddleware.checkAccessToken,
    authMiddleware.checkRole,
    productController.deleteProduct);

productRouter.delete('/:productId/images',
    authMiddleware.checkAccessToken,
    authMiddleware.checkRole,
    productController.deleteImage);

module.exports = productRouter;