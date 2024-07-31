import {$host} from "./axios.service";
import {urls} from "../configs/urls";

const typeService = {
    getAll: () => $host.get(urls.types),
    getTypesByCategoryId: (categoryId) => $host.get(`${urls.types}/${categoryId}`),
    createType: (type) => $host.post(urls.types, {type}),
    updateType: (typeId, type) => $host.put(`${urls.types}/${typeId}`, {type}),
    deleteById: (typeId) => $host.delete(`${urls.types}/${typeId}`)
}

export {typeService}