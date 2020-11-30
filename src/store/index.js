import Vue from 'vue'
import Vuex from 'vuex'
import { userService } from '@/api/user';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedIn:false
  },
  mutations: {
    login(state, value) {
      state.loggedIn = value;
    }
  },
  actions: {
    checkLoginState(context) {
      context.commit('login', userService.isLoggedIn());
    },
    async logout(context) {
      console.log('logout called');
      await userService.logout();
      context.commit('login', false);
    },
    setLoginState(context, value) {
      context.commit('login', value);
    }
  },
  modules: {
  }
})
