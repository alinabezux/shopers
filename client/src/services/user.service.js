import { $authHost} from "./axios.service";
import { urls } from "../configs/urls";

const userService = {
    getUserById: (userId) => $authHost.get(`${urls.users}/${userId}`)
}

export { userService }