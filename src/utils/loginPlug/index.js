import Store from '@/store/'

import router from '@/router/router.js'


// 封装一个自定义的判断是否登录的插件
let myPlug = {};
myPlug.install = function (Vue) {
    Vue.prototype.$login = function () {
        if (Store.state.userInfo) { // 如果登录了
            return true;
        } else {                    // 如果没登录
            this.$dialog.confirm({
                title: '温馨提示',
                message: '该功能需要登录,是否前往登录?'
            }).then(() => {
                router.push("/login");
                // on confirm
            }).catch(() => {
                // on cancel
            });
            return false;
        }
    }
}

export default myPlug;