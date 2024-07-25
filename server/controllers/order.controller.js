const Order = require("../db/models/Order");
const Product = require("../db/models/Product");
const ProductInBasket = require("../db/models/ProductInBasket");


module.exports = {
    createOrder: async (req, res, next) => {
        try {
            const products = [];
            const { userId } = req.params;

            const productsInBasket = await ProductInBasket.find({ _user: userId })

            for (const productInBasket of productsInBasket) {
                const product = await Product.findById(productInBasket._product)
                products.push(`${product.name} - ${productInBasket.quantity} шт.`)
            }

            const order = await Order.create({
                ...req.body, _user: userId,
                orderItems: products
            });

            await ProductInBasket.deleteMany({ _user: userId })
            res.json(order);
        } catch (e) {
            next(e);
        }
    },

    getAllOrders: async (req, res, next) => {
        try {
            let { page } = req.query;
            page = page || 1;
            const limit = 5;
            let count;

            const orders = await Order.find({}).limit(limit).skip((page - 1) * limit);
            count = await Order.countDocuments();

            res.json({
                orders,
                count: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            });
        } catch (e) {
            next(e);
        }
    },

    updateOrderStatus: async (req, res, next) => {
        try {
            const newStatus = req.body.status;
            console.log(newStatus);

            const updatedOrder = await Order.findByIdAndUpdate(req.params.orderId, { status: newStatus }, { new: true });

            res.json(updatedOrder);
        } catch (e) {
            next(e);
        }
    }


}