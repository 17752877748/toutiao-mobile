
import { http } from '../utils/http/'

// 获取频道列表
export const getChannel = data => {
    return http.get('/app/v1_0/user/channels')
}