import { $authHost, $host } from "./axios.service";
import { urls } from "../configs/urls";
import { jwtDecode } from "jwt-decode";

const authService = {
    register: (user) => $host.post(urls.auth.registration, { user }),
    login: (user) => $host.post(urls.auth.logIn, { user }),
    getAccessToken: () => localStorage.getItem('access'),
    getUser: () => {
        const accessToken = localStorage.getItem('access');
        if (!accessToken) {
            return null;
        }
        try {
            const decodedToken = jwtDecode(accessToken);
            const userId = decodedToken.id;
            return userId;
        } catch (error) {
            localStorage.removeItem('access'); // Видалення невалідного токену
            return null; // Повернення null, якщо токен невалідний
        }
    },

    refresh: () => $authHost.post(urls.auth.refresh, { withCredentials: true }),

    logOut: () => $authHost.post(urls.auth.logOut),
    deleteInfo: () => {
        localStorage.removeItem('access')
    },

    // getRefreshToken: () => localStorage.getItem('refresh'),
}
export { authService }