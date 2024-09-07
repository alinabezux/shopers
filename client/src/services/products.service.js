import { $authHost, $host } from "./axios.service";
import { urls } from "../configs/urls";

const productsService = {
    getAll: (_category, _type, page, isGettingAll) => $host.get(urls.products, {
        params: {
            _category,
            _type,
            page,
            isGettingAll
        }
    }),
    getById: (productId) => $host.get(`${urls.products}/${productId}`),
    createProduct: (product) => $authHost.post(urls.products, { product }),
    uploadPhoto: (productId, images) => $authHost.patch(`${urls.products}/${productId}/images`, images),
    updateProduct: (productId, product) => $authHost.patch(`${urls.products}/${productId}`, { product }),
    deleteById: (productId) => $authHost.delete(`${urls.products}/${productId}`),
    deleteImage: (productId, imageUrl) => $authHost.delete(`${urls.products}/${productId}/images`, { data: { imageUrl } }),
}

export { productsService }