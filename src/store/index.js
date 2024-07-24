import { createStore } from 'vuex';

const store = createStore({
  state: {
    token: localStorage.getItem('token') || ''
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    clearToken(state) {
      state.token = '';
      localStorage.removeItem('token');
    },
    // clearUserData() {
    //   localStorage.removeItem('nombre');
    //   localStorage.removeItem('apellido');
    //   localStorage.removeItem('email');
    //   localStorage.removeItem('usuario');
    //   localStorage.removeItem('id');
    // },
  },
  actions: {
    login({ commit }, token) {
      commit('setToken', token);
    },
    logout({ commit }) {
      commit('clearToken');
      // commit('clearUserData');
    },
    // eslint-disable-next-line no-unused-vars
    saveUserDataOnLocalStorage({ commit }, userData) {
      localStorage.setItem('nombre', userData.nombre);
      localStorage.setItem('apellido', userData.apellido);
      localStorage.setItem('usuario', userData.usuario);
      localStorage.setItem('email', userData.email);
      localStorage.setItem('id', userData.id);
    }
  },
  getters: {

    isAuthenticated: (state) => {
      let tokenValue

      if (state.token === 'undefined' || !!state.token == false) {
        tokenValue = false
      }
      return tokenValue
      // return !!state.token
    }
  }
});

export default store;
