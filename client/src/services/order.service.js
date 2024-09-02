import { urls } from "../configs/urls"
import { $authHost } from "./axios.service"

const orderService = {
    createOrder: (userId, order) => $authHost.post(`${urls.order}/${userId}`, { order }),
    getAllOrders: (page) => $authHost.get(urls.order, { params: { page } }),
    getUserOrders: (userId) => $authHost.get(`${urls.order}/${userId}`),
    deleteById: (orderId) => $authHost.delete(`${urls.order}/${orderId}`),
}

export { orderService }