import {$host} from "./axios.service";
import {urls} from "../configs/urls";

const productsService = {
    getAll: (_category, _type,) => $host.get(urls.products, {params: {_category, _type}}),
    getById: (productId) => $host.get(`${urls.products}/${productId}`),
    // createProduct: (product) => $authHost.post(urls.products, {product}),
    // uploadPhoto: (productId, image) => $authHost.patch(`${urls.products}/${productId}`, image),
    // updateProduct: (productId, product) => $authHost.put(`${urls.products}/${productId}`, {product}),
    // deleteById: (productId) => $authHost.delete(`${urls.products}/${productId}`),
}

export {productsService}