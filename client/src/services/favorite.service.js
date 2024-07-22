import { urls } from "../configs/urls"
import { $authHost } from "./axios.service"


const favoriteService = {
    getFavorite: (userId) => $authHost.get(`${urls.favorite}/${userId}`),
    addToFavorite: (userId, productId) => $authHost.post(`${urls.favorite}/${userId}/${productId}`),
    deleteFromFavorite: (userId, productId) => $authHost.delete(`${urls.favorite}/${userId}/${productId}`),
}

export { favoriteService }