import {$authHost, $host} from "./axios.service";
import {urls} from "../configs/urls";

const authService = {
    register: (user) => $host.post(urls.auth.registration, {user}),
    login: (user) => $host.post(urls.auth.logIn, user),
    refresh: (refresh) => $authHost.post(urls.auth.refresh, {refresh}),
    logOut: (access) => $authHost.post(urls.auth.logOut, {access}),

    getAccessToken: () => localStorage.getItem('access'),
    getRefreshToken: () => localStorage.getItem('refresh'),
    getUser: () => localStorage.getItem('userId'),
    deleteInfo: () => {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        localStorage.removeItem('userId')
    },

}
export {authService}