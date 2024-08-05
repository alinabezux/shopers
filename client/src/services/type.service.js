import {$authHost, $host} from "./axios.service";
import {urls} from "../configs/urls";

const typeService = {
    getAll: () => $host.get(urls.types),
    getTypesByCategoryId: (categoryId) => $host.get(`${urls.types}/${categoryId}`),
    createType: (type) => $authHost.post(urls.types, {type}),
    updateType: (typeId, type) => $authHost.put(`${urls.types}/${typeId}`, {type}),
    deleteById: (typeId) => $authHost.delete(`${urls.types}/${typeId}`)
}

export {typeService}