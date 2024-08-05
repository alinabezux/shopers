import { $authHost, $host } from "./axios.service";
import { urls } from "../configs/urls";

const categoryService = {
    getAll: () => $host.get(urls.categories),
    createCategory: (category) => $authHost.post(urls.categories, { category }),
    updateCategory: (categoryId, category) => $authHost.put(`${urls.categories}/${categoryId}`, { category }),
    uploadPhoto: (categoryId, formData) => $authHost.patch(`${urls.categories}/${categoryId}`, formData),
    deleteById: (categoryId, imageUrl) => $authHost.delete(`${urls.categories}/${categoryId}`, { data: { imageUrl } })
}

export { categoryService }