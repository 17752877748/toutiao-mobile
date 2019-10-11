import { http } from '@/utils/http/';

// 关注
export const follow = id => {
    return http.post('app/v1_0/user/followings', {
        target: id
    })
}
// 取消关注
export const cancelFollow = id => {
    return http.delete(`/app/v1_0/user/followings/${id}`)
}

// 获取个人信息
export const meInfo = data => {
    return http.get("/app/v1_0/user");
}

// 获取用户详细资料
export const detailedInfo = () => {
    return http.get("/app/v1_0/user/profile");
}

// 修改用户详细资料
export const setProfile = ({ name, gender, birthday }) => {
    return http.patch('/app/v1_0/user/profile', {
        name,
        gender,
        birthday
    })
}

// 修改用户头像
export const setPhoto = img => {
    let fm = new FormData();
    fm.append('photo', img);
    return http.patch('/app/v1_0/user/photo', fm);
}