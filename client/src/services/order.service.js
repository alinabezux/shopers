import { urls } from "../configs/urls"
import { $authHost, $host } from "./axios.service"

const orderService = {
    createOrderAuth: (userId, order) => $authHost.post(`${urls.order}/${userId}`, { order }),
    createOrder: (productsInBasket, order) => $host.post(`${urls.order}`, { productsInBasket, order }),
    getAllOrders: () => $authHost.get(urls.order),
    getUserOrders: (userId) => $authHost.get(`${urls.order}/${userId}`),
    deleteById: (orderId) => $authHost.delete(`${urls.order}/${orderId}`),
}

export { orderService }