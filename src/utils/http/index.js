import axios from 'axios';
import { getStorage } from '@/utils/storage/index.js';

import Store from '@/store/'

import router from '@/router/router.js'

import JSONbig from 'json-bigint';

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


// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, async function (error) {
    // 对响应错误做点什么
    if (error.response.status == 401) {
        if (Store.state.userInfo) {
            // 获取新的token
            let res = await axios({
                url: "http://ttapi.research.itcast.cn/app/v1_0/authorizations",
                method: "put",
                headers: {
                    Authorization: `Bearer ${Store.state.userInfo.refresh_token}`
                }
            })
            console.log(res);
            // 把新的token替换到我们vuex里
            Store.commit('setUserInfo', {
                token: res.data.data.token,
                refresh_token: Store.state.userInfo.refresh_token
            })
            // 再次发起之前请求,获取数据
            return http(error.config);
        } else {
            router.push("/login");
        }
    }
    return Promise.reject(error);
});




// 自定义axios对响应体的转换
http.defaults.transformResponse = [
    function (data) {
        // 我尝试把响应体当JSON转成JS对象，能转就返回了，不能转会报错（报错它会立即进入到catch）
        try {
            // 如果你能按JSON转换成对象，那么就转
            return JSONbig.parse(data);
        } catch (error) {
            // 如果不能就原样返回
            return data;
        }
    }
];




