// Configuración de la API - inicio del archivo
const getApiBaseUrl = () => {
    // En Azure Static Web Apps, las variables están disponibles en tiempo de construcción
    // Para JavaScript vanilla, usaremos detección de entorno
    
    // Producción: si estamos en azurestaticapps.net
    if (window.location.hostname.includes('azurestaticapps.net')) {
        return 'https://portal-tesis-backend.azurewebsites.net/api'; // Cambiaremos esto en Sesión 4
    }
    
    // Desarrollo: backend local
    return 'http://127.0.0.1:5000/api';
};

const API_BASE_URL = getApiBaseUrl();

class ApiClient {
    constructor() {
        this.baseURL = API_BASE_URL;
        this.token = localStorage.getItem('token');
        
        // Log para debugging
        console.log('API Base URL:', this.baseURL);
        console.log('Environment:', window.location.hostname);
    }
    
    // ... resto del código igual
}