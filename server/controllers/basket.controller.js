const Product = require("../db/models/Product");
const ProductInBasket = require("../db/models/ProductInBasket");
const ApiError = require("../errors/ApiError");

module.exports = {
    getUsersBasket: async (req, res, next) => {
        try {
            const productsData = [];

            const productsInBasket = await ProductInBasket.find({ _user: req.params.userId })
            for (const productInBasket of productsInBasket) {
                const product = await Product.findById(productInBasket._product)
                productsData.push({
                    ...product._doc,
                    quantity: productInBasket.quantity,
                })
            }
            res.json(productsData).status(200);

        } catch (e) {
            next(e);
        }
    },

    addToBasket: async (req, res, next) => {
        try {

            let productInBasket = await ProductInBasket.findOne({ _product: req.params.productId, _user: req.params.userId })

            if (productInBasket) {
                productInBasket = await ProductInBasket.findOneAndUpdate(
                    { _id: productInBasket._id },
                    { $inc: { quantity: 1 } },
                    { new: true }
                )
            } else
                productInBasket = await ProductInBasket.create({
                    _user: req.params.userId,
                    _product: req.params.productId
                });

            res.json(productInBasket).status(200)
        } catch (e) {
            next(e)
        }
    },

    deleteFromBasket: async (req, res, next) => {
        try {
            let productInBasket = await ProductInBasket.findOne({ _product: req.params.productId, _user: req.params.userId })

            if (productInBasket) {
                await ProductInBasket.deleteOne({ _id: productInBasket._id });
                res.sendStatus(204);
            } else {
                res.status(404).json({ message: "Такого продукту не існує в даній корзині" });
            }
        } catch (e) {
            next(e)
        }
    },

    changeProductQuantity: async (req, res, next) => {
        try {
            let updatedProductInBasket;
            
            let productInBasket = await ProductInBasket.findOne({ _product: req.params.productId, _user: req.params.userId })
            if (productInBasket) {
                updatedProductInBasket = await ProductInBasket.findOneAndUpdate(
                    { _id: productInBasket._id },
                    { quantity: req.body.quantity },
                    { new: true }
                )
            } else {
                res.status(404).json({ message: "Такого продукту не існує в даній корзині" });
            }
            res.json(updatedProductInBasket).status(200)

        } catch (e) {
            next(e)
        }
    }
}