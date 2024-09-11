import axios from "axios";
import { createBrowserHistory } from "history"

import { authService } from "./auth.service";
import { devURL, prodURL } from "../configs/urls";

const baseURL = process.env.NODE_ENV === "production" ? prodURL : devURL;

const $host = axios.create({ withCredentials: true, baseURL })

const $authHost = axios.create({ withCredentials: true, baseURL })

const history = createBrowserHistory();

$authHost.interceptors.request.use((config) => {
    const accessToken = authService.getAccessToken();
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
})

$authHost.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        
        // Якщо відповідь 401 і запит не було повторено
        if (error.response?.status === 401 && !originalRequest._isRetry) {
            originalRequest._isRetry = true;  // Встановлюємо флаг
            
            try {
                const { data } = await authService.refresh();
                console.log(`data = ${data}`);
                
                // Зберігаємо новий access token та оновлюємо сесію
                localStorage.setItem('access', data.accessToken);
                sessionStorage.setItem('userId', data._user);

                // Пробуємо повторити початковий запит з новим токеном
                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                return $authHost(originalRequest);

            } catch (e) {
                console.log('НЕ АВТОРИЗОВАН');
                
                // Видаляємо інформацію користувача і перенаправляємо
                authService.deleteInfo();
                history.replace('/auth?expSession=true');
                
                // Повертаємо помилку, щоб запобігти подальшим спробам
                return Promise.reject(e);
            }
        }
        
        // Якщо це інша помилка або запит вже був повторений
        return Promise.reject(error);
    }
);


export { $host, $authHost, history };