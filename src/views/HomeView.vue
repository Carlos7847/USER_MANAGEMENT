<template>
  <div class="home-container">
    <div class="welcome-message">
      <h1>Bienvenid@ a mi aplicación {{userName}}</h1>
      <p>Hola, soy Carlos Mamani. ¡Gracias por estar aquí!</p>
      <p>Este es mi carta de bienvenida para los usuarios logueados. Espero que disfrutes de tu tiempo aquí.</p>
      <button @click="goToUpdateProfile">Actualiza tu perfil aquí</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  computed: {
    userName() {
      return localStorage.getItem('nombre') || 'Usuario';
    }
  },
  methods: {
    goToUpdateProfile() {
      this.$router.push('/update-profile');
    }
  }
}
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
  padding: 20px;
  text-align: center;
}

.welcome-message {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 40px;
  max-width: 600px;
  width: 100%;
  margin-top: 20px;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

p {
  color: #555;
  margin-bottom: 10px;
}

button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}

button:hover {
  background-color: #0056b3;
}
</style>
