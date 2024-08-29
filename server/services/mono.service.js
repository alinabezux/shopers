const axios = require('axios');
const { MONO_TOKEN, CLIENT_URL, SERVER_URL } = require('../configs/configs');
const { CASH } = require('../configs/order.enum');
const ApiError = require('../errors/ApiError');

module.exports = {
    createInvoice: async (order) => {
        let sum;
        if (order.paymentMethod === CASH) {
            sum = 10000
        } else sum = order.totalSum * 100;

        let cashback;

        const invoiceData = {
            amount: sum,
            merchantPaymInfo: {
                reference: order.orderID,
                destination: "Оплата за товар",
                basketOrder: order.orderItems.map(item => ({
                    name: item.name,
                    qty: item.quantity,
                    sum: item.price * 100 * item.quantity,
                    icon: item.img,
                    code: item.article,
                    // discounts: [
                    //     {
                    //         "type": "DISCOUNT",
                    //         "mode": "VALUE",
                    //         "value": bonusSum/orderItems.length
                    //     }
                    // ] 
                }))
            },
            redirectUrl: `${CLIENT_URL}/order/${order.orderID}`,
            webHookUrl: 'https://55c6-213-5-193-12.ngrok-free.app/webhook/paymentStatus',
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
            throw new ApiError(error.data.errCode, `Monobank API error: ${error.data.errText}`);
        }
    },

    getInvoiceStatus: async (invoiceId) => {
        const url = `https://api.monobank.ua/api/merchant/invoice/status?invoiceId=${invoiceId}`;

        console.log('Sending request to Monobank API for invoice status:', url);

        try {
            const response = await axios.get(url, {
                headers: {
                    'X-Token': MONO_TOKEN,
                    'Content-Type': 'application/json'
                }
            });

            return response.data;

        } catch (error) {

            console.log('error.response.data');
            console.log(error.response.data);

            throw new ApiError(error.response.status, `Monobank API error: ${error.response.statusText}`);
        }
    }
}

