import { urls } from "../configs/urls"
import { $host } from "./axios.service"

const orderService = {
    createOrder: (userId, order) => $host.post(`${urls.order}/${userId}`, {order}),
    getAllOrders: (page) => $host.get(urls.order, {params: {page}}),
    // updateOrderStatus: (orderId, status) => $authHost.patch(`${urls.order}/${orderId}`, {status})
}

export {orderService}