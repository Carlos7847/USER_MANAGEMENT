<template>
  <div class="profile-container">
    <div class="profile-box">
      <div class="profile-header">
        <img src="@/assets/avatar.jpeg" alt="Avatar" class="avatar">
        <h1>Datos de usuario</h1>
        <p>Puedes actualizar tus credenciales</p>
      </div>
      <form @submit.prevent="updateProfile">
        <div class="input-container" :class="{ error: nombreError }">
          <input v-model="localUser.nombre" type="text" placeholder="Nombre" required class="input-field" />
        </div>
        <p v-if="nombreError" class="error-message">{{ nombreError }}</p>
        <div class="input-container" :class="{ error: apellidoError }">
          <input v-model="localUser.apellido" type="text" placeholder="Apellido" required class="input-field" />
        </div>
        <p v-if="apellidoError" class="error-message">{{ apellidoError }}</p>
        <div class="input-container" :class="{ error: usuarioError }">
          <input v-model="localUser.usuario" type="text" placeholder="Usuario" required class="input-field" />
        </div>
        <p v-if="usuarioError" class="error-message">{{ usuarioError }}</p>
        <div class="input-container" :class="{ error: emailError }">
          <input v-model="localUser.email" type="email" placeholder="Email" required class="input-field" />
        </div>
        <p v-if="emailError" class="error-message">{{ emailError }}</p>
        <div class="input-container" :class="{ error: passwordError }">
          <input v-model="localUser.password" type="password" placeholder="Contraseña" required class="input-field" />
        </div>
        <p v-if="passwordError" class="error-message">{{ passwordError }}</p>
        <button type="submit" class="btn">Actualizar</button>
      </form>
      <br>
      <button class="btn-home" @click="this.$router.push('/')">Ir al home</button>
      <p v-if="notification" class="notification">{{ notification }}</p>
    </div>
  </div>
</template>

<script>
import apiClient from '@/helpers/axios';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      localUser: {
        nombre: '',
        apellido: '',
        usuario: '',
        email: '',
        password: ''
      },
      nombreError: '',
      apellidoError: '',
      usuarioError: '',
      emailError: '',
      passwordError: '',
      notification: ''
    };
  },

  methods: {
    ...mapActions(['updateUser', 'setNotification', 'saveUserDataOnLocalStorage']),
    validateEmail() {
      const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!re.test(this.localUser.email)) {
        this.emailError = 'Por favor, ingrese una dirección de correo válida';
        return false;
      }
      this.emailError = '';
      return true;
    },
    validatePassword() {
      if (this.localUser.password.length < 6) {
        this.passwordError = 'La contraseña debe tener al menos 6 caracteres';
        return false;
      }
      this.passwordError = '';
      return true;
    },
    validateNombre() {
      if (this.localUser.nombre.trim() === '') {
        this.nombreError = 'El nombre no puede estar vacío';
        return false;
      }
      this.nombreError = '';
      return true;
    },
    validateApellido() {
      if (this.localUser.apellido.trim() === '') {
        this.apellidoError = 'El apellido no puede estar vacío';
        return false;
      }
      this.apellidoError = '';
      return true;
    },
    validateUsuario() {
      if (this.localUser.usuario.trim() === '') {
        this.usuarioError = 'El usuario no puede estar vacío';
        return false;
      }
      this.usuarioError = '';
      return true;
    },
    async updateProfile() {
      const isNombreValid = this.validateNombre();
      const isApellidoValid = this.validateApellido();
      const isUsuarioValid = this.validateUsuario();
      const isEmailValid = this.validateEmail();
      const isPasswordValid = this.validatePassword();
      
      if (isNombreValid && isApellidoValid && isUsuarioValid && isEmailValid && isPasswordValid) {
        try {
          const {data} = await apiClient.put(`/users/${localStorage.id}`, {
            nombre: this.localUser.nombre,
            apellido: this.localUser.apellido,
            usuario: this.localUser.usuario,
            email: this.localUser.email,
            contraseña: this.localUser.password
          });
          // this.updateUser(this.localUser);
          this.saveUserDataOnLocalStorage({ nombre: data.nombre, apellido: data.apellido, usuario: data.usuario, email: data.email, id: data.id });
          this.localUser.password = ''
          alert('Se actualizaron los datos correctamente. Felicidades ' + data.nombre)
        } catch (error) {
          alert(error.response.data.message || "Error al actualizar usuario");
          this.notification = (error.response.data.message || "Error al actualizar usuario");
          console.error(error.response.data);
        }
      } else {
        this.setNotification('Por favor, corrija los errores antes de enviar');
      }
    },

    async getUserData() {
      
      try {
        const { data } = await apiClient.get(`/users/${localStorage.id}`);
        this.localUser.nombre = data.nombre;
        this.localUser.apellido = data.apellido;
        this.localUser.usuario = data.usuario;
        this.localUser.email = data.email;

        //actualizamos los valores en el local storage con los valores que nos devolvió la API
        this.saveUserDataOnLocalStorage({ nombre: data.nombre, apellido: data.apellido, usuario: data.usuario, email: data.email, id: data.id });
      } catch (error) {
        console.error("Error al obtener información del usuario:", error);
      }
    },
  },

  mounted() {
    this.setNotification('')
    this.localUser.nombre = localStorage.getItem('nombre');
    this.localUser.apellido = localStorage.getItem('apellido');
    this.localUser.usuario = localStorage.getItem('usuario');
    this.localUser.email = localStorage.getItem('email');

    let id = localStorage.getItem('id');
    if (!this.localUser.nombre || !this.localUser.apellido || !this.localUser.usuario || !this.localUser.email || !id) this.getUserData();
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

.btn-home {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background: #ff6600;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.btn-home:hover {
  background: #b36b00;
}
</style>
