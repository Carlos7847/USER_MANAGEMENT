// src/auth.js
import { reactive } from 'vue';

export const authState = reactive({
    token: localStorage.getItem('token'),
    setToken(newToken) {
        this.token = newToken;
        if (newToken) {
            localStorage.setItem('token', newToken);
        } else {
            localStorage.removeItem('token');
        }
    }
});
