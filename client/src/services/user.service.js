import { $authHost } from "./axios.service";
import { urls } from "../configs/urls";

const userService = {
    getAllUsers: ({page}) => $authHost.get(`${urls.users}?page=${page}`),
    getUserById: (userId) => $authHost.get(`${urls.users}/${userId}`),
    updateUser: (userId, user) => $authHost.put(`${urls.users}/${userId}`, { user }),
    changePassword: (userId, currentPassword, newPassword) => $authHost.put(`${urls.users}/${userId}/changePassword`, { currentPassword, newPassword }),
}

export { userService }