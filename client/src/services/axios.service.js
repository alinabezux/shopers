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
        const originalRequest = error.config;
        if (error.response?.status === 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true;
            try {
                const { data } = await authService.refresh();
                localStorage.setItem('access', data.accessToken)
                $authHost.request(originalRequest)
            } catch (e) {
                authService.deleteInfo()
                history.replace('/auth#logIn?expSession=true')
            }
            return $authHost(error.config)
        }
        return Promise.reject(error)
    })

export { $host, $authHost };