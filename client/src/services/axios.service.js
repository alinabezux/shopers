import axios from "axios";
import { createBrowserHistory } from "history";

import { authService } from "./auth.service";
import { baseURL } from "../configs/urls";

// const baseURL = process.env.NODE_ENV === "production" ? prodURL : devURL;

const $host = axios.create({
    withCredentials: true,
    baseURL
})

const $authHost = axios.create({
    withCredentials: true,
    baseURL
 })
export const history = createBrowserHistory();

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
},
    async (error) => {
        const refreshToken = authService.getRefreshToken();
        if (error.response?.status === 401 && refreshToken && !isRefreshing) {
            isRefreshing = true;
            try {
                const { data } = await authService.refresh(refreshToken);

                localStorage.setItem('access', data.accessToken)
                localStorage.setItem('refresh', data.refreshToken)

            } catch (e) {
                authService.deleteInfo()
                history.replace('/logIn?expSession=true')
            }
            isRefreshing = false;
            return $authHost(error.config)
        }
        return Promise.reject(error)
    }
)

export { $host, $authHost };