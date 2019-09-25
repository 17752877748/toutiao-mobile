import axios from 'axios';
import { getStorage } from '@/utils/storage/index.js';

export const http = axios.create({
    baseURL: "http://ttapi.research.itcast.cn/"
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
    if (getStorage()) {
        config.headers.Authorization = `Bearer ${getStorage().token}`
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


