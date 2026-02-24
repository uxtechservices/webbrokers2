// Import Axios and Create
export const production = import.meta.env.VITE_PRODUCTION_MODE;
export const API = (production == "true") ? import.meta.env.VITE_API_PRODUCTION : import.meta.env.VITE_API_DEVELOPMENT;

import router from '@/router';
import axios from 'axios';
import { removeToken, removeUserData } from './authentication';

const instance = axios.create({
  baseURL: API,
  headers: {
      'ngrok-skip-browser-warning': 'true',
      'Content-Type': 'application/json'
  }
});


// 🔹 Interceptor de respuesta global
instance.interceptors.response.use(
  (response) => response, // si todo va bien, se devuelve normal
  (error) => {
    if (error.response && error.response.status === 401) {
      // El token es inválido o expiró
      console.warn("Token inválido o expirado, redirigiendo al login...");
      // Limpia tu estado de autenticación
      removeToken();
      removeUserData();
      // Redirige al login
      router.push({ path: "/signin" });
    }

    // Propaga el error para otros manejos locales
    return Promise.reject(error);
  }
);


export default instance;