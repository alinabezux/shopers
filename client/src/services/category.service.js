import {$host} from "./axios.service";
import {urls} from "../configs/urls";

const categoryService = {
    getAll: () => $host.get(urls.categories),
    // createCategory: (category) => $authHost.post(urls.categories, {category}),
    // getCategoryById:
    // updateCategory: (categoryId, category) => $authHost.put(`${urls.categories}/${categoryId}`, {category}),
    // uploadPhoto: (categoryId, image) => $authHost.patch(`${urls.categories}/${categoryId}`, image),
    // deleteById: (categoryId) => $authHost.delete(`${urls.categories}/${categoryId}`)
}

export {categoryService}