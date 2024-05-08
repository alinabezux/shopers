const Product = require('../db/models/Product');

module.exports = {
    createProduct: async (req, res, next) => {
        try {
            const {price} = req.body;
            let cashback = price * 0.02;
            const product = await Product.create({...req.body, cashback});

            return res.status(200).json(product);

        } catch (e) {
            return next(e)
        }
    },
    deleteProduct: async (req, res, next) => {
        try {
            await Product.deleteOne({_id: req.params.productId})

            res.sendStatus(204);
        } catch (e) {
            next(e)
        }
    },
    getAllProducts: async (req, res, next) => {
        try {
            const products = await Product.find({});

            return res.status(200).json(products)
        } catch (e) {
            return next(e)
        }
    },
    getProductByArticle: async (req, res, next) => {
        try {
            const item = await Product.findOne({article: req.query.article});

            return res.status(200).json(item);
        } catch (e) {
            next(e);
        }
    },
    getProductById: async (req, res, next) => {
        try {
            const item = await Product.findById(req.params.productId);

            return res.status(200).json(item);
        } catch (e) {
            next(e);
        }
    },
    // uploadImage: async (req, res, next) => {
    //     try {
    //         const sendData = await S3Service.uploadPublicFile(req.files.image, 'products', req.params.productId);
    //         const newProduct = await Product.findByIdAndUpdate(req.params.productId, {image: sendData.Location}, {new: true});
    //
    //         res.json(newProduct);
    //     } catch (e) {
    //         next(e);
    //     }
    // },

    updateProduct: async (req, res, next) => {
        try {
            const newInfo = req.body;

            const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, newInfo, {new: true});
            res.status(200).json(updatedProduct);

        } catch (e) {
            next(e)
        }
    },
}