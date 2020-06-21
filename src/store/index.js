import Vue from 'vue'
import Vuex from 'vuex'
import { getToken } from '@/utils/mytoken'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: getToken('info') || {}
  },
  mutations: {
    setUserInfo (state, payload) {
      state.userInfo = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
