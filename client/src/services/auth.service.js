import { jwtDecode } from "jwt-decode";

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

    getUser: () => {
        const userId = localStorage.getItem('userId');
        if (userId) return userId;
        
        const accessToken = localStorage.getItem('access');
        if (!accessToken) return null;
        
        try {
            const decodedToken = jwtDecode(accessToken);
            const { id } = decodedToken;
            if (id) {
                localStorage.setItem('userId', id);
                return id;
            }
        } catch (error) {
            console.error("Invalid access token:", error);
        }

        // Очищення даних у разі помилки
        localStorage.removeItem('access');
        localStorage.removeItem('userId');

        return null;
    }

}
export { authService }