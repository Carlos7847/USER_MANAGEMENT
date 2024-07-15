import { createStore } from 'vuex';

const store = createStore({
  state: {
    user: {
      nombre: '',
      apellido: '',
      usuario: '',
      email: '',
      password: ''
    },
    notification: '',
    token: localStorage.getItem('token') || ''
  },
  mutations: {
    setUser(state, userData) {
      state.user = { ...userData };
    },
    setNotification(state, message) {
      state.notification = message;
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    clearToken(state) {
      state.token = '';
      localStorage.removeItem('token');
    },
  },
  actions: {
    updateUser({ commit }, userData) {
      commit('setUser', userData);
      // commit('setNotification', 'Información actualizada correctamente');
    },
    setNotification({ commit }, message) {
      commit('setNotification', message);
    },
    login({ commit }, token) {
      commit('setToken', token);
    },
    logout({ commit }) {
      commit('clearToken');
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
    user: (state) => state.user,
    notification: (state) => state.notification,
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
