import axios from 'axios';

const baseURL = process.env.API_BASE_URL ?? 'http://localhost:3000/api/v1'



const apiClient = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default apiClient;
