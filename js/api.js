// Configuración de la API
const getApiBaseUrl = () => {
    // Producción: si estamos en azurestaticapps.net
    if (window.location.hostname.includes('azurestaticapps.net')) {
        return 'https://portal-tesis-backend-g3bfedesdvbsc6az.centralus-01.azurewebsites.net/api';
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
    }

    // Helper para headers con autorización
    getHeaders() {
        const headers = {
            'Content-Type': 'application/json'
        };
        
        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }
        
        return headers;
    }

    // Helper para manejo de errores
    async handleResponse(response) {
        const data = await response.json();
        
        if (!response.ok) {
            if (response.status === 401) {
                this.logout();
                throw new Error('Sesión expirada. Por favor inicia sesión nuevamente.');
            }
            throw new Error(data.message || 'Error en la solicitud');
        }
        
        return data;
    }

    // Método genérico para requests
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: this.getHeaders(),
            ...options
        };

        try {
            const response = await fetch(url, config);
            return await this.handleResponse(response);
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // Autenticación
    async login(email, password) {
        const data = await this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        
        if (data.success) {
            this.token = data.data.token;
            localStorage.setItem('token', this.token);
            localStorage.setItem('user', JSON.stringify(data.data.user));
        }
        
        return data;
    }

    async register(userData) {
        const data = await this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
        
        if (data.success) {
            this.token = data.data.token;
            localStorage.setItem('token', this.token);
            localStorage.setItem('user', JSON.stringify(data.data.user));
        }
        
        return data;
    }

    logout() {
        this.token = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    }

    // Tesis
    async getTesis() {
        return await this.request('/tesis');
    }

    async createTesis(tesisData) {
        return await this.request('/tesis', {
            method: 'POST',
            body: JSON.stringify(tesisData)
        });
    }

    // Health check
    async healthCheck() {
        return await this.request('/health');
    }
}

// Instancia