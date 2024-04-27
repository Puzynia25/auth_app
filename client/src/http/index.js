import axios from "axios";

//для обычных запросов, которые не требуют авторизации
const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

//автоматически будет подставляться header "authorization" и туда будет добавляться токен
const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

//для 2-ого инстанса необходимо автоматически подставлять токен к каждому запросу
//при авторизации мы в это локальное хранилище будем добавлять токен
const authInterceptor = (config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
