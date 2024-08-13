import { urls } from "../configs/urls"
import { $authHost } from "./axios.service"


const basketService = {
    getBasket: (userId) => $authHost.get(`${urls.basket}/${userId}`),
    addToBasket: (userId, productId, quantity) => $authHost.post(`${urls.basket}/${userId}/${productId}`, { quantity }),
    deleteFromBasket: (userId, productId) => $authHost.delete(`${urls.basket}/${userId}/${productId}`),
    updateProductInBasketQuantity: (userId, productId, quantity) => $authHost.patch(`${urls.basket}/${userId}/${productId}`, { quantity })
}

export { basketService }