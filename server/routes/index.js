const router = require('express').Router();
const productRouter = require('./product.router');
const categoryRouter = require('./category.router');
const typeRouter = require('./type.router');

router.use('/products', productRouter)
router.use('/categories', categoryRouter);
router.use('/types', typeRouter);


module.exports = router;

