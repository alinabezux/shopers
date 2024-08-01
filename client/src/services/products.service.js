import { $host } from "./axios.service";
import { urls } from "../configs/urls";

const productsService = {
    getAll: (_category, _type,) => $host.get(urls.products, { params: { _category, _type } }),
    getById: (productId) => $host.get(`${urls.products}/${productId}`),
    createProduct: (product) => $host.post(urls.products, { product }),
    // uploadPhoto: (productId, image) => $authHost.patch(`${urls.products}/${productId}`, image),
    updateProduct: (productId, product) => $host.put(`${urls.products}/${productId}`, { product }),
    deleteById: (productId) => $host.delete(`${urls.products}/${productId}`),
}

export { productsService }