const axios = require('axios');
const { MONO_TOKEN, CLIENT_URL } = require('../configs/configs');

module.exports = {
    createInvoice: async (order) => {
        const invoiceData = {
            amount: order.totalSum * 100,
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

