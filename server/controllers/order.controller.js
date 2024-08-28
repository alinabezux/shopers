const Order = require("../db/models/Order");
const Product = require("../db/models/Product");
const ProductInBasket = require("../db/models/ProductInBasket");
const User = require("../db/models/User");
const ApiError = require("../errors/ApiError");
const monoService = require("../services/mono.service");


module.exports = {
    createOrder: async (req, res, next) => {
        try {
            const userId = req.user._id;

            const productsInBasket = await ProductInBasket.find({ _user: userId }).populate('_product');

            console.log('----');
            // const products = productsInBasket.map(productInBasket => productInBasket._id);

            const products = productsInBasket.map(productInBasket => {
                return {
                    _productId: productInBasket._product._id,
                    name: productInBasket._product.name,
                    info: productInBasket._product?.info,
                    quantity: productInBasket.quantity,
                    price: productInBasket._product.price,
                    img: productInBasket._product.images[0],
                    article: productInBasket._product.article
                };
            });
            // console.log(products);

            if (products.length === 0) {
                return res.status(400).json({ message: "No products in basket" });
            }

            const orderData = {
                ...req.body.order,
                _user: userId,
                orderItems: products
            };

            const [order, user] = await Promise.all([
                Order.create(orderData),
                User.findById(userId),
            ]);


            const invoice = await monoService.createInvoice(order)
            // console.log('invoice');
            // console.log(invoice);

            const status = await monoService.getInvoiceStatus(invoice.invoiceId)
            // console.log('status');
            // console.log(status);

            if (status.status === 'created') {
                await ProductInBasket.deleteMany({ _user: userId });  //+

                const order = await Order.findOne({ 'orderID': status.reference }); // +

                if (order) {  //+
                    order.paymentStatus = status.status;
                    await order.save();
                }
            }

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

            // console.log('-------------');
            // const lastOrder = orders[orders.length - 1];
            // console.log(lastOrder);

            res.status(200).json({
                orders,
                count: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page
            });
        } catch (e) {
            next(e);
        }
    },

    getUserOrders: async (req, res, next) => {
        try {
            const orders = await Order.find({ _user: req.params.userId });

            res.status(200).json(orders);
        } catch (e) {
            next(e);
        }
    },

    updateOrderStatus: async (req, res, next) => {
        try {
            const newStatus = req.body.status;
            console.log(newStatus);

            const updatedOrder = await Order.findByIdAndUpdate(req.params.orderId, { status: newStatus }, { new: true });

            res.status(200).json(updatedOrder);
        } catch (e) {
            next(e);
        }
    },

    deleteOrderById: async (req, res, next) => {
        try {
            await Order.findByIdAndDelete({ _id: req.params.orderId });

            res.sendStatus(204);
        } catch (e) {
            next(e)
        }
    },
}