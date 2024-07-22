import { urls } from "../configs/urls"
import { $authHost } from "./axios.service"


const favouriteService = {
    getFavourite: (userId) => $authHost.get(`${urls.favourite}/${userId}`),
    addToFavourite: (userId, productId) => $authHost.post(`${urls.favourite}/${userId}/${productId}`),
    deleteFromFavourite: (userId, productId) => $authHost.delete(`${urls.favourite}/${userId}/${productId}`),
}

export { favouriteService }