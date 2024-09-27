import { urls } from "../configs/urls"
import { $authHost } from "./axios.service"

const basketService = {
    getBasket: (userId) => $authHost.get(`${urls.basket}/${userId}`),
    addToBasket: (userId, productId, quantity, size) => $authHost.post(`${urls.basket}/${userId}/${productId}`, { quantity, size }),
    deleteFromBasket: (userId, productInBasketId) => $authHost.delete(`${urls.basket}/${userId}/${productInBasketId}`),
    updateProductInBasketQuantity: (userId, productInBasketId, quantity) => $authHost.patch(`${urls.basket}/${userId}/${productInBasketId}`, { quantity })
}

export { basketService }