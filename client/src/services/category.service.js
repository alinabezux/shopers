import { $host } from "./axios.service";
import { urls } from "../configs/urls";

const categoryService = {
    getAll: () => $host.get(urls.categories),
    createCategory: (category) => $host.post(urls.categories, { category }),
    updateCategory: (categoryId, category) => $host.put(`${urls.categories}/${categoryId}`, { category }),
    uploadPhoto: (categoryId, image) => $host.patch(`${urls.categories}/${categoryId}`, image),
    deleteById: (categoryId) => $host.delete(`${urls.categories}/${categoryId}`)
}

export { categoryService }