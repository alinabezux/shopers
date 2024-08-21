import { MONO_URL } from "../configs/urls";
import { $authHost } from "./axios.service";

const monoService = {
    // createInvoice: (order) => {
    //     const invoiceData = {
    //         amount: order.totalSum * 100,
    //         merchantPaymInfo: {
    //             reference: order.orderID,
    //             destination: "Оплата за товар",
    //             basketOrder: order.orderItems.map(item => ({
    //                 name: item._product.name,
    //                 qty: item.quantity,
    //                 sum: Math.round(item._product.price * 100), // сума в копійках
    //                 code: item._product.article,

    //                 // discounts: [
    //                 //     {
    //                 //         type: DISCOUNT,
    //                 //         mode: VALUE,
    //                 //         value: сума знижки поділена на кількість продуктів
    //                 //     }
    //                 // ]

    //             }))
    //         },
    //         redirectUrl: `http://localhost:5000/order/${order.orderID}`,
    //     };
        
    //     const headers = {
    //         'X-Token': 'uTFSxz1lNnJsl-vKjkP7DnCnq34pmo6VjzLJtQLm0A9E',
    //     };

    //     return $authHost.post(MONO_URL, invoiceData, { headers })
    // }
}

export { monoService }