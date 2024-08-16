import { $authHost, $host } from "./axios.service";
import { urls } from "../configs/urls";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie"

const authService = {
    register: (user) => $host.post(urls.auth.registration, { user }),
    login: (user) => $host.post(urls.auth.logIn, { user }),
    refresh: () => $authHost.post(urls.auth.refresh),

    forgotPassword: (email) => $host.post(urls.auth.forgotPassword, { email }),
    setNewPassword: (token, newPassword) => $host.put(urls.auth.forgotPassword, { newPassword }, {
        headers: {
            'Authorization': token
        }
    }),

    getAccessToken: () => localStorage.getItem('access'),
    getRefreshToken: () => Cookies.get('refreshToken'),

    logOut: () => $authHost.post(urls.auth.logOut),
    deleteInfo: () => {
        localStorage.removeItem('access')
        sessionStorage.removeItem('userId')
        Cookies.remove('refreshToken')
    },
    getUser: () => {
        const userId = sessionStorage.getItem('userId');
        if (userId) {
            return userId;
        }

        const accessToken = localStorage.getItem('access');
        if (!accessToken) {
            return null;
        }

        try {
            const decodedToken = jwtDecode(accessToken);
            sessionStorage.setItem('userId', decodedToken.id);
            return decodedToken.id;
        } catch (error) {
            localStorage.removeItem('access');
            return null;
        }

    },

}
export { authService }