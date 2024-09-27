import { $authHost, $host } from "./axios.service";
import { urls } from "../configs/urls";

const authService = {
    register: (user) => $host.post(urls.auth.registration, { user }),

    login: (user) => $host.post(urls.auth.logIn, { user }),

    refresh: (refresh) => $authHost.post(urls.auth.refresh, { refresh }),

    forgotPassword: (email) => $host.post(urls.auth.forgotPassword, { email }),

    setNewPassword: (token, newPassword) => $host.put(urls.auth.forgotPassword, { newPassword }, {
        headers: {
            'Authorization': token
        }
    }),

    getAccessToken: () => localStorage.getItem('access'),

    getRefreshToken: () => localStorage.getItem('refresh'),

    logOut: () => $authHost.post(urls.auth.logOut),

    deleteInfo: () => {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        localStorage.removeItem('userId')
    },

    getUser: () => localStorage.getItem('userId')

}
export { authService }