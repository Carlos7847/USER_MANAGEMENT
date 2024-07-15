<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <img src="@/assets/avatar.jpeg" alt="Avatar" class="avatar">
        <h1>LOGIN</h1>
      </div>
      <form @submit.prevent="login">
        <div class="input-container" :class="{ error: emailError }">
          <input v-model="email" type="email" placeholder="Email" required class="input-field" />
        </div>
        <p v-if="emailError" class="error-message">{{ emailError }}</p>
        <div class="input-container" :class="{ error: passwordError }">
          <input v-model="password" type="password" placeholder="Contraseña" required class="input-field" />
        </div>
        <p v-if="passwordError" class="error-message">{{ passwordError }}</p>
        <button type="submit" class="btn">LOGIN</button>
      </form>
      <br>
      <small class="account-text">¿No tienes un usuario creado?
        <span class="login-link" @click="$router.push('/register-profile')"> Regístrate </span>
      </small>
      <p v-if="notification" class="notification">{{ notification }}</p>
      <!-- <p class="forgot-password">Forgot Your Password? <a href="#">Click here</a></p> -->
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import apiClient from '@/helpers/axios';
import { authState } from '@/auth';

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      emailError: '',
      passwordError: ''
    };
  },
  computed: {
    ...mapState(['notification']),
    notification() {
      return authState.notification;
    }
  },
  methods: {
    ...mapActions(['updateUser', 'setNotification', 'login', 'saveUserDataOnLocalStorage']),
    async login() {
      const isEmailValid = this.validateEmail();
      const isPasswordValid = this.validatePassword();
      
      if (isEmailValid && isPasswordValid) {
        try {
          const response = await apiClient.post('/auth/login', {
            usernameOrEmail: this.email,
            password: this.password
          });
          // Supongamos que la respuesta incluye un token que necesitas guardar
          const token = response.data.access_token;
          const { nombre, apellido, usuario, email, id } = response.data.user

          // localStorage.setItem('token', token);
          authState.setToken(token);
          this.saveUserDataOnLocalStorage({ nombre, apellido, usuario, email, id })
          this.$router.push('/');

          
        } catch (error) {
          this.setNotification('Login fallido: ' + (error.response?.data?.message || error.message));
        }
      } else {
        this.setNotification('Por favor, corrija los errores antes de enviar');
      }
    },

    validateEmail() {
      const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!re.test(this.email)) {
        this.emailError = 'Ingrese un correo electrónico válido';
        return false;
      }
      this.emailError = '';
      return true;
    },
    validatePassword() {
      if (this.password.length < 6) {
        this.passwordError = 'Ingrese una contraseña con un mínimo de 6 caracteres';
        return false;
      }
      this.passwordError = '';
      return true;
    },
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}

.login-box {
  width: 300px;
  padding: 40px;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  border-radius: 10px;
}

.login-header {
  margin-bottom: 20px;
}

.login-header img.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.login-header h1 {
  font-size: 24px;
  margin-top: 10px;
  color: #333;
}

.input-container {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.input-container .icon {
  padding: 10px;
  background: #007BFF;
  color: white;
  min-width: 40px;
  text-align: center;
  border-radius: 5px 0 0 5px;
}

.input-container .input-field {
  width: 100%;
  padding: 10px;
  outline: none;
  border: 1px solid #ccc;
  /* border-left: none; */
  border-radius: 0 5px 5px 0;
}

.btn {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background: #007BFF;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.btn:hover {
  background: #0056b3;
}

.notification {
  color: red;
  margin-top: 10px;
}

.forgot-password {
  margin-top: 15px;
}

.forgot-password a {
  color: #007BFF;
  text-decoration: none;
}



.account-text {
  font-size: 14px;
  color: #555;
  margin-top: 10px;
}

.login-link {
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
}

.login-link:hover {
  color: #0056b3;
}

.clear-button {
  background-color: #f8f9fa;
  color: #333;
  border: 1px solid #ced4da;
  padding: 5px 10px;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
}

.clear-button:hover {
  background-color: #e2e6ea;
  border-color: #dae0e5;
}
</style>
