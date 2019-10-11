import { http } from '@/utils/http/';

// 登录
export const login = data => {
    return http.post("/app/v1_0/authorizations", data);
}

