const Product = require('../db/models/Product');
const S3service = require("../services/S3.service");

module.exports = {
    createProduct: async (req, res, next) => {
        try {
            const { price } = req.body.product;
            const cashback = Math.trunc(price * 0.02);
            const product = await Product.create({ ...req.body.product, cashback });

            return res.status(201).json(product);

        } catch (e) {
            return next(e)
        }
    },
    getAllProducts: async (req, res, next) => {
        try {
            let { _category, _type } = req.query;
            let products;
            // if(const products = await Product.find({});

            if (!_category && !_type) {
                products = await Product.find({})
                // products = await Product.find({}).limit(limit).skip((page - 1) * limit);
                // count = await Product.countDocuments();
            }
            if (_category && !_type) {
                products = await Product.find({ _category })
                // products = await Product.find({_category}).limit(limit).skip((page - 1) * limit);
                // count = await Product.countDocuments({category});
            }
            if (_category && _type) {
                products = await Product.find({ _category, _type })
                // products = await Product.find({category, type}).limit(limit).skip((page - 1) * limit);
                // count = await Product.countDocuments({category, type});
            }

            return res.status(200).json(products)
        } catch (e) {
            return next(e)
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
    /// не працює
    // getProductByArticle: async (req, res, next) => {
    //     try {
    //         const item = await Product.findOne({article: req.params.article});
    //         return res.status(200).json(item);
    //     } catch (e) {
    //         next(e);
    //     }
    // },
    uploadImage: async (req, res, next) => {
        try {
            const sendData = await S3service.uploadPublicFile(req.files.images, 'products', req.params.productId);
            const newProduct = await Product.findByIdAndUpdate(
                req.params.productId,
                { $push: { images: sendData.Location } },
                { new: true });

            res.json(newProduct);
        } catch (e) {
            next(e);
        }
    },

    updateProduct: async (req, res, next) => {
        try {
            const newInfo = req.body.product;
            const { price } = req.body.product;
            const cashback = Math.trunc(price * 0.02);

            const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, { ...newInfo, cashback }, { new: true });
            res.status(200).json(updatedProduct);

        } catch (e) {
            next(e)
        }
    },

    deleteProduct: async (req, res, next) => {
        try {
            await Product.deleteOne({ _id: req.params.productId })

            res.sendStatus(204);
        } catch (e) {
            next(e)
        }
    },
}