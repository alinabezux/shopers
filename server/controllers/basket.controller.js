const Product = require("../db/models/Product");
const ProductInBasket = require("../db/models/ProductInBasket");
const ApiError = require("../errors/ApiError");

module.exports = {
    getUsersBasket: async (req, res, next) => {
        try {
            const productsData = [];
            const { userId } = req.params;

            if (req.decoded.id === userId) {
                const productsInBasket = await ProductInBasket.find({ _user: userId })
                for (const productInBasket of productsInBasket) {
                    const product = await Product.findById(productInBasket._product)
                    productsData.push({
                        ...product._doc,
                        quantity: productInBasket.quantity,
                    })
                }
                res.json(productsData);
            } else throw new ApiError(401, 'Немає доступу.')

        } catch (e) {
            next(e);
        }
    },

    addToBasket: async (req, res, next) => {
        try {
            const { productId } = req.params;

            if (req.decoded.id === req.params.userId) {
                let productInBasket = await ProductInBasket.findOne({ _product: productId, _user: req.params.userId })
                if (productInBasket) {
                    await ProductInBasket.updateOne(
                        { _id: productInBasket._id },
                        { quantity: productInBasket.quantity + 1 },
                        { new: true }
                    )
                } else await ProductInBasket.create({
                    _user: req.params.userId,
                    _product: productId
                });

                res.sendStatus(200)
            } else throw new ApiError(401, 'Немає доступу.')

        } catch (e) {
            next(e)
        }
    },

    deleteFromBasket: async (req, res, next) => {
        try {
            if (req.decoded.id === req.params.userId) {
                await ProductInBasket.deleteOne({ _product: req.params.productId });
            } else throw new ApiError(401, 'Немає доступу.')
            res.sendStatus(204);
        } catch (e) {
            next(e)
        }
    },

    changeProductQuantity: async (req, res, next) => {
        try {
            const updatedProductInBasket = await ProductInBasket.findOneAndUpdate({ _product: req.params.productId }, { quantity: req.body.quantity }, { new: true });

            res.json(updatedProductInBasket)
        } catch (e) {
            next(e)
        }
    }
}