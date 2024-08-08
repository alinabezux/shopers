import { urls } from "../configs/urls"
import { $authHost, $host } from "./axios.service"

const orderService = {
    createOrder: (userId, order) => $authHost.post(`${urls.order}/${userId}`, {order}),
    getAllOrders: (page) => $authHost.get(urls.order, {params: {page}}),
    // updateOrderStatus: (orderId, status) => $authHost.patch(`${urls.order}/${orderId}`, {status})
}

export {orderService}