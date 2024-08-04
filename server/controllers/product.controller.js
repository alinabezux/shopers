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
            let { _category, _type, page = 1, isGettingAll } = req.query;
            const limit = 20;
            let products;
            let count;

            if (JSON.parse(isGettingAll)) {
                products = await Product.find({})
                count = await Product.countDocuments();

                return res.json({ products, count: count });
            }

            if (!_category && !_type) {
                products = await Product.find({}).limit(limit).skip((page - 1) * limit);
                count = await Product.countDocuments();
            }
            if (_category && !_type) {
                products = await Product.find({ _category }).limit(limit).skip((page - 1) * limit);
                count = await Product.countDocuments({ _category });
            }
            if (!_category && _type) {
                products = await Product.find({ _type }).limit(limit).skip((page - 1) * limit);
                count = await Product.countDocuments({ _type });
            };
            if (_category && _type) {
                products = await Product.find({ _category, _type }).limit(limit).skip((page - 1) * limit);
                count = await Product.countDocuments({ _category, _type });
            }

            return res.json({
                products,
                count: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            });
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

    uploadImage: async (req, res, next) => {
        try {
            const imageFiles = req.files.images;

            const uploadPromises = imageFiles.map(file =>
                S3service.uploadPublicFile(file, 'products', req.params.productId)
            );
            const uploadedImages = await Promise.all(uploadPromises);

            const imageUrls = uploadedImages.map(data => data.Location);

            const newProduct = await Product.findByIdAndUpdate(
                req.params.productId,
                { $push: { images: { $each: imageUrls } } },
                { new: true });

            res.json(newProduct);
        } catch (e) {
            next(e);
        }
    },
    deleteImage: async (req, res, next) => {
        const { productId } = req.params;
        const { imageUrl } = req.body;

        if (!productId || !imageUrl) {
            return res.status(400).json({ message: 'Product ID and image URL are required' });
        }
        try {
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            product.images = product.images.filter(img => img !== imageUrl);
            await product.save()

            res.status(200).json({ message: 'Image deleted successfully' });
        } catch (e) {
            next(e)
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