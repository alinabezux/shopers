import { $host } from "./axios.service";
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
    createProduct: (product) => $host.post(urls.products, { product }),
    uploadPhoto: (productId, images) => $host.patch(`${urls.products}/${productId}`, images),
    updateProduct: (productId, product) => $host.put(`${urls.products}/${productId}`, { product }),
    deleteById: (productId) => $host.delete(`${urls.products}/${productId}`),
    deleteImage: (productId, imageUrl) => $host.delete(`${urls.products}/${productId}/images`, { data: { imageUrl } }),
}

export { productsService }