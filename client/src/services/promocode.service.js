import {$authHost} from "./axios.service";
import {urls} from "../configs/urls";

const promocodeService = {
    getAll: () => $authHost.get(urls.promocode),
    create: (promocode) => $authHost.post(urls.promocode, {promocode}),
    deleteById: (promocodeId) => $authHost.delete(`${urls.promocode}/${promocodeId}`)
}

export {promocodeService}