const Product = require('../db/models/Product');

module.exports = {
    createProduct: async (req, res, next) => {
        try {
            const product = await Product.create(req.body);

            return res.status(200).json(product);

        } catch (e) {
            return next(e)
        }
    },
}