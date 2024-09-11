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
    if (error.response?.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const { data } = await authService.refresh();
            console.log(`data = ${data}`)

            localStorage.setItem('access', data.accessToken)
            sessionStorage.setItem('userId', data._user)
        } catch (e) {
            console.log('НЕ АВТОРИЗОВАН')
            authService.deleteInfo()
            history.replace('/auth?expSession=true')
            return Promise.reject(e);
        }

        // return $authHost(error.config)
    }
    return Promise.reject(error)
})

export { $host, $authHost, history };