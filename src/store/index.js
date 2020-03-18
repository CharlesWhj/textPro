import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../utils/axios'

// 实现vuex的可持续化
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    name: '张三'
  },
  mutations: {
    changeName (state, data) {
      state.name = data
    }
  },
  actions: {
    sendName (store, data) {
      axios.get('/scenics/banners').then(res => {
        // console.log(res);
        if (res.status === 200) {
          this.commit('changeName', data)
          // 异步的方法
          // store.state.name=data
          // console.log(this);
          console.log(this.state.name)
        }
      })
    }
  },
  modules: {}
})
