<template>
  <div class="profile-container">
    <div class="profile-box">
      <div class="profile-header">
        <img src="@/assets/avatar.jpeg" alt="Avatar" class="avatar">
        <h1>Registro de usuario</h1>
      </div>
      <form @submit.prevent="registerProfile">
        <div class="input-container" :class="{ error: nombreError }">
          <input v-model="nombre" type="text" placeholder="Nombre" required class="input-field" />
        </div>
        <p v-if="nombreError" class="error-message">{{ nombreError }}</p>
        <div class="input-container" :class="{ error: apellidoError }">
          <input v-model="apellido" type="text" placeholder="Apellido" required class="input-field" />
        </div>
        <p v-if="apellidoError" class="error-message">{{ apellidoError }}</p>
        <div class="input-container" :class="{ error: usuarioError }">
          <input v-model="usuario" type="text" placeholder="Usuario" required class="input-field" />
        </div>
        <p v-if="usuarioError" class="error-message">{{ usuarioError }}</p>
        <div class="input-container" :class="{ error: emailError }">
          <input v-model="email" type="email" placeholder="Email" required class="input-field" />
        </div>
        <p v-if="emailError" class="error-message">{{ emailError }}</p>
        <div class="input-container" :class="{ error: passwordError }">
          <input v-model="password" type="password" placeholder="Contraseña" required class="input-field" />
        </div>
        <p v-if="passwordError" class="error-message">{{ passwordError }}</p>
        <button type="submit" class="btn">Registrarse</button>
      </form>
      <br>
      <small class="account-text">¿Ya tienes una cuenta?
        <span class="login-link" @click="$router.push('/login')">Login
        </span>
      </small>
      <br>
      <button class="clear-button" @click="clearInputs()">Limpiar formulario</button>
      <p v-if="notification" class="notification">{{ notification }}</p>
    </div>
  </div>
</template>

<script>
import apiClient from '@/helpers/axios';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'RegisterProfile',
  data() {
    return {
      // campos del usuario
      nombre: '',
      apellido: '',
      usuario: '',
      email: '',
      password: '',
      //campos de errores
      nombreError: '',
      apellidoError: '',
      usuarioError: '',
      emailError: '',
      passwordError: ''
    };
  },
  computed: {
    ...mapState(['user', 'notification'])
  },
  methods: {
    ...mapActions(['updateUser', 'setNotification', 'saveUserDataOnLocalStorage']),
    validateEmail() {
      const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!re.test(this.email)) {
        this.emailError = 'Por favor, ingrese una dirección de correo válida';
        return false;
      }
      this.emailError = '';
      return true;
    },
    validatePassword() {
      if (this.password.length < 6) {
        this.passwordError = 'La contraseña debe tener al menos 6 caracteres';
        return false;
      }
      this.passwordError = '';
      return true;
    },
    validateNombre() {
      if (this.nombre.trim() === '') {
        this.nombreError = 'El nombre no puede estar vacío';
        return false;
      }
      this.nombreError = '';
      return true;
    },
    validateApellido() {
      if (this.apellido.trim() === '') {
        this.apellidoError = 'El apellido no puede estar vacío';
        return false;
      }
      this.apellidoError = '';
      return true;
    },
    validateUsuario() {
      if (this.usuario.trim() === '') {
        this.usuarioError = 'El usuario no puede estar vacío';
        return false;
      }
      this.usuarioError = '';
      return true;
    },
    async registerProfile() {
      const isNombreValid = this.validateNombre();
      const isApellidoValid = this.validateApellido();
      const isUsuarioValid = this.validateUsuario();
      const isEmailValid = this.validateEmail();
      const isPasswordValid = this.validatePassword();
      
      if (isNombreValid && isApellidoValid && isUsuarioValid && isEmailValid && isPasswordValid) {
        try {
          const { data } = await apiClient.post(`/auth/register`, {
            nombre: this.nombre,
            apellido: this.apellido,
            usuario: this.usuario,
            email: this.email,
            contraseña: this.password
          });
          alert('Se registró el usuario correctamente. Felicidades ' + data.nombre);
          this.clearInputs();
          this.$router.push('/login')
        } catch (error) {
          this.setNotification(error.response.data.message || "Error al crear usuario");
          console.error(error.response.data);
        }
      } else {
        this.setNotification('Por favor, corrija los errores antes de enviar');
      }
    },
    clearInputs() {
      this.nombre = '',
      this.apellido = '',
      this.usuario = '',
      this.email = '',
      this.password = '',
      this.setNotification('')
    }
  },

  mounted() { 
    this.setNotification('')
  }
};
</script>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}

.profile-box {
  width: 300px;
  padding: 40px;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  border-radius: 10px;
}

.profile-header {
  margin-bottom: 20px;
}

.profile-header img.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.profile-header h1 {
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
  border-radius: 0 5px 5px 0;
}

.input-container.error .input-field {
  border-color: red;
}

.error-message {
  color: red;
  margin: -10px 0 10px 0;
  font-size: 12px;
  text-align: left;
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
