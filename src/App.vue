<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <button v-if="isLoggedIn" @click="logout">Desloguear</button>
  <router-view />
</template>

<script>
import { authState } from '@/auth';

export default {
  name: 'App',
  computed: {
    isLoggedIn() {
      return authState.token !== null && authState.token !== 'undefined';
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('nombre');
      localStorage.removeItem('apellido');
      localStorage.removeItem('usuario');
      localStorage.removeItem('email');
      localStorage.removeItem('id');
      authState.setToken(null);
      this.$router.push('/login');
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}



nav {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  background-color: #f8f9fa;
}

button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
