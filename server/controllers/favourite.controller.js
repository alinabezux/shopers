const ProductInFavourite = require("../db/models/ProductInFavourite");
const ApiError = require("../errors/ApiError");

module.exports = {
    getUsersFavourite: async (req, res, next) => {
        try {

            const productsInFavourite = await ProductInFavourite.find({ _user: req.params.userId })

            res.json(productsInFavourite).status(200);

        } catch (e) {
            next(e);
        }
    },

    addToFavourite: async (req, res, next) => {
        try {
            let productInFavourite = await ProductInFavourite.create({
                _user: req.params.userId,
                _product: req.params.productId
            });

            res.json(productInFavourite).status(200)
        } catch (e) {
            next(e)
        }
    },

    deleteFromFavourite: async (req, res, next) => {
        try {
            let productInFavourite = await ProductInFavourite.findOne({ _product: req.params.productId, _user: req.params.userId })

            if (productInFavourite) {
                await ProductInFavourite.deleteOne({ _id: productInFavourite._id });
                res.sendStatus(204);
            } else {
                res.status(404).json({ message: "Такого продукту не існує в даному списку бажань." });
            }
        } catch (e) {
            next(e)
        }
    },


}