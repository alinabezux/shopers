const axios = require('axios');
const { MONO_TOKEN, CLIENT_URL } = require('../configs/configs');
const { CASH } = require('../configs/order.enum');
module.exports = {
    createInvoice: async (order) => {
        let sum;
        if (order.paymentMethod === CASH) {
            sum = 10000
        } else sum = order.totalSum * 100;

        const invoiceData = {
            amount: sum,
            merchantPaymInfo: {
                reference: order.orderID,
                destination: "Оплата за товар",
                basketOrder: order.orderItems.map(item => ({
                    name: item.name,
                    qty: item.quantity,
                    sum: item.price * 100 * item.quantity,
                    icon: "string",
                    code: item.article,
                }))
            },
            redirectUrl: `${CLIENT_URL}/order/${order.orderID}`,
        };

        try {
            const response = await axios.post('https://api.monobank.ua/api/merchant/invoice/create', invoiceData, {
                headers: {
                    'X-Token': MONO_TOKEN,
                    'Content-Type': 'application/json'
                }
            });

            return response.data;

        } catch (error) {
            throw new Error(`Monobank API error: ${error.response?.data?.errorDescription || error.message}`);
        }
    }
}

