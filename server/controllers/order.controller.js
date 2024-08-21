const Order = require("../db/models/Order");
const Product = require("../db/models/Product");
const ProductInBasket = require("../db/models/ProductInBasket");
const User = require("../db/models/User");
const monoService = require("../services/mono.service");


module.exports = {
    createOrder: async (req, res, next) => {
        try {
            const userId = req.user._id;

            const productsInBasket = await ProductInBasket.find({ _user: userId }).populate('_product');

            // console.log('----');
            // const products = productsInBasket.map(productInBasket => productInBasket._id);
            // console.log(products);

            const products = productsInBasket.map(productInBasket => {
                return {
                    name: productInBasket._product.name,
                    info: productInBasket._product?.info,
                    quantity: productInBasket.quantity,
                    price: productInBasket._product.price,
                    img: productInBasket._product.images[0],
                    article: productInBasket._product.article
                };
            });

            const orderData = {
                ...req.body.order,
                _user: userId,
                orderItems: products
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
            const invoice = await monoService.createInvoice(order)

            res.status(200).json({ order, invoice });

        } catch (e) {
            next(e);
        }
    },

    getAllOrders: async (req, res, next) => {
        try {
            let { page = 1 } = req.query;
            const limit = 20;
            let count;

            const orders = await Order.find({}).limit(limit).skip((page - 1) * limit);

            count = await Order.countDocuments();

            console.log('-------------');
            const lastOrder = orders[orders.length - 1];
            console.log(lastOrder);

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