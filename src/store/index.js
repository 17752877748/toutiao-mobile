import Vue from 'vue'
import Vuex from 'vuex'
import { setStorage,getStorage } from '@/utils/storage/';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: getStorage()
  },
  mutations: {
    setUserInfo(state, list) {
      // 存到本地
      setStorage(list);
      
      state.userInfo = list;
    }
  },
  actions: {

  }
})
