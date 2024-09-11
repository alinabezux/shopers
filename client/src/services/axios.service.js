import axios from "axios";
import { createBrowserHistory } from "history"

import { authService } from "./auth.service";
import { devURL, prodURL } from "../configs/urls";

const baseURL = process.env.NODE_ENV === "production" ? prodURL : devURL;

const $host = axios.create({ withCredentials: true, baseURL })

const $authHost = axios.create({ withCredentials: true, baseURL })

const history = createBrowserHistory();
let isRefreshing = false;

$authHost.interceptors.request.use((config) => {
    const accessToken = authService.getAccessToken();
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
})

$authHost.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const refreshToken = authService.getRefreshToken();

    if (error.response?.status === 401) {
        if (!refreshToken) {
            authService.deleteInfo();
            history.replace('/auth?expSession=true');
            return Promise.reject(error);
        }
        if (!isRefreshing) {
            isRefreshing = true;
            try {
                const { data } = await authService.refresh();
                localStorage.setItem('access', data.accessToken)
                sessionStorage.removeItem('userId')
            } catch (e) {
                authService.deleteInfo()
                history.replace('/auth?expSession=true')
                return Promise.reject(e);
            }
        }
        isRefreshing = false;
        return $authHost(error.config)
    }
    return Promise.reject(error)
}
)

export { $host, $authHost, history };