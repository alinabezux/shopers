const Product = require("../db/models/Product");
const S3service = require('../services/S3.service');

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
            let count;

            if (!_category && !_type) {
                products = await Product.find({})
                count = await Product.countDocuments();
            }
            if (_category && !_type) {
                products = await Product.find({ _category })
                count = await Product.countDocuments({ _category });
            }
            if (!_category && _type) {
                products = await Product.find({ _type })
                count = await Product.countDocuments({ _type });
            };
            if (_category && _type) {
                products = await Product.find({ _category, _type })
                count = await Product.countDocuments({ _category, _type });
            }

            return res.json({
                products,
                count: count,
            });
        } catch (e) {
            return next(e)
        }
    },

    getProductById: async (req, res, next) => {
        try {
            console.log(req.params.productId)
            const item = await Product.findById(req.params.productId);
            return res.status(200).json(item);
        } catch (e) {
            next(e);
        }
    },

    uploadImage: async (req, res, next) => {
        try {
            if (!req.files || !req.files.images) {
                return res.status(400).json({ error: 'No images provided' });
            }
            const imageFiles = Array.isArray(req.files.images) ? req.files.images : [req.files.images];

            const uploadPromises = imageFiles.map(file =>
                S3service.uploadPublicFile(file, 'products', req.params.productId)
            );
            const uploadedImages = await Promise.all(uploadPromises);

            const imageUrls = uploadedImages.map(data => data.Location);

            if (!imageUrls.length) {
                return res.status(500).json({ error: 'Failed to upload images' });
            }

            const newProduct = await Product.findByIdAndUpdate(
                req.params.productId,
                { $push: { images: { $each: imageUrls } } },
                { new: true }
            );

            if (!newProduct) {
                return res.status(404).json({ error: 'Product not found' });
            }

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
            await S3service.deleteImage('products', productId, imageUrl);

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
            const { productId } = req.params;
            const newInfo = req.body.product;

            if (!productId || !newInfo) {
                return res.status(400).json({ message: 'Product ID і дані для оновлення обов\'язкові.' });
            }

            if (newInfo.article) {
                const product = await Product.findOne({ article: newInfo.article });

                if (product) {
                    return res.status(409).json({ message: 'Продукт з таким артикулом вже існує.' });
                }
            }

            if (newInfo.price) {
                newInfo.cashback = Math.trunc(newInfo.price * 0.02);
            }

            const updatedProduct = await Product.findByIdAndUpdate(
                productId,
                { $set: { ...newInfo } },
                { new: true });

            res.status(200).json(updatedProduct);

        } catch (e) {
            next(e)
        }
    },

    addDiscountProduct: async (req, res, next) => {
        try {
            const { productId } = req.params;
            console.log(productId)
            const discount = req.body;
            console.log(discount)
            const product = await Product.findById(productId);

            if (!productId || !discount) {
                return res.status(400).json({ message: "Product ID і знижка обов'язкові." });
            }

            const discountedPrice = product.price - (product.price / 100 * discount.discount);

            const cashback = Math.trunc(discountedPrice * 0.02)

            const updatedProduct = await Product.findByIdAndUpdate(
                productId,
                { $set: { ...discount, cashback } },
                { new: true }
            );

            res.status(200).json(updatedProduct);

        } catch (e) {
            next(e)
        }
    },

    deleteProduct: async (req, res, next) => {
        try {
            const { productId } = req.params;

            const product = await Product.findById(productId);

            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            if (product.images && product.images.length > 0) {
                const imageDeletionPromises = product.images.map((imageUrl) =>
                    S3service.deleteImage('products', productId, imageUrl)
                );
                await Promise.all(imageDeletionPromises);
            }

            await Product.deleteOne({ _id: productId })

            res.sendStatus(204);
        } catch (e) {
            next(e)
        }
    },
}