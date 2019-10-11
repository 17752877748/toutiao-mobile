
import { http } from '../utils/http/'

// 获取频道列表
export const getChannel = data => {
    return http.get('/app/v1_0/user/channels')
}

// 全部频道列表
export const channelAll = data => {
    return http.get("/app/v1_0/channels");
}

// 修改我的频道
export const editChannel = channels => {
    return http.put("/app/v1_0/user/channels", {
        channels
    });
}