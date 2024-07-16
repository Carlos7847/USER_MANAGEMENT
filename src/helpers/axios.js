import axios from 'axios';

const baseURL = process.env.VUE_APP_API_BASE_URL || 'http://localhost:3000/api/v1'

// se crea configuración global para peticiones axios
const apiClient = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default apiClient;
