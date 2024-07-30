const Order = require("../db/models/Order");
const Product = require("../db/models/Product");
const ProductInBasket = require("../db/models/ProductInBasket");
const User = require("../db/models/User");


module.exports = {
    createOrder: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const productsInBasket = await ProductInBasket.find({ _user: userId }).populate('_product');

            const products = productsInBasket.map(productInBasket => {
                return `${productInBasket._product.name} - ${productInBasket.quantity} шт.`;
            });

            const orderData = {
                ...req.body.order,
                _user: userId,
                orderItems: products,
            };

            const [order, user] = await Promise.all([
                Order.create(orderData),
                User.findById(userId),
                ProductInBasket.deleteMany({ _user: userId })
            ]);

            // Обчислення нових бонусів

            if (req.body.order.useBonus === true) {
                await User.findByIdAndUpdate(userId, { bonus: req.body.order.cashback }, { new: true });
            } else {
                const newBonus = user.bonus + req.body.order.cashback;
                await User.findByIdAndUpdate(userId, { bonus: newBonus }, { new: true });
            }

            res.json(order);

        } catch (e) {
            next(e);
        }
    },

    getAllOrders: async (req, res, next) => {
        try {
            let { page } = req.query;
            page = page || 1;
            const limit = 10;
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