const USER_KEY = 'userInfo';

export const setStorage = (data) => {
    window.localStorage.setItem(USER_KEY, JSON.stringify(data));
}
export const getStorage = () => {
    return JSON.parse(window.localStorage.getItem(USER_KEY));
}
export const removeStorage = () => {
    window.localStorage.removeItem(USER_KEY);
}
