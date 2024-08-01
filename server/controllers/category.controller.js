const Category = require('../db/models/Category');
const Product = require("../db/models/Product");
const S3service = require("../services/S3.service");

module.exports = {
    createCategory: async (req, res, next) => {
        try {
            const category = await Category.create(req.body.category);

            return res.status(200).json(category);

        } catch (e) {
            return next(e)
        }
    },
    getAllCategories: async (req, res, next) => {
        try {
            const categories = await Category.find({});

            return res.status(200).json(categories)
        } catch (e) {
            return next(e)
        }
    },
    getCategoryById: async (req, res, next) => {
        try {
            const category = await Category.findById(req.params.categoryId);

            res.status(200).json(category);
        } catch (e) {
            next(e);
        }
    },
    updateCategory:
        async (req, res, next) => {
            try {
                const newInfo = req.body.category;
                const updatedCategory = await Category.findByIdAndUpdate(req.params.categoryId, newInfo, {new: true});

                res.status(200).json(updatedCategory);
            } catch (e) {
                next(e);
            }
        },

    uploadImage: async (req, res, next) => {
        try {
            const sendData = await S3service.uploadPublicFile(req.files.image, 'categories', req.params.categoryId);
            const newCategory = await Category.findByIdAndUpdate(req.params.categoryId, {image: sendData.Location},{new: true});

            res.status(200).json(newCategory);
        } catch (e) {
            next(e);
        }
    },

    deleteCategory:
        async (req, res, next) => {
            try {
                await Category.deleteOne({_id: req.params.categoryId});

                res.sendStatus(204);
            } catch (e) {
                next(e)
            }
        }
}