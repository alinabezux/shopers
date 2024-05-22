import {$host} from "./axios.service";
import {urls} from "../configs/urls";

const typeService = {
    getAll: () => $host.get(urls.types),
    getTypesByCategoryId: (categoryId) => $host.get(`${urls.types}/${categoryId}`),
}

export {typeService}