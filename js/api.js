function getApiBaseUrl() {
    // Si está en Azure Static Web Apps (producción)
    if (window.location.hostname.includes('azurestaticapps.net')) {
        return 'https://portal-tesis-backend-g3bfedesdvbsc6az.centralus-01.azurewebsites.net/api';
    }
    
    // Si está en localhost (desarrollo)
    return 'http://127.0.0.1:5000/api';
}

const API_BASE_URL = getApiBaseUrl();

class ApiClient {
    constructor() {
        this.baseURL = API_BASE_URL;
        console.log('API URL configurada:', this.baseURL); // Para debugging
    }
    
    async login(email, password) {
        const response = await fetch(`${this.baseURL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        return response.json();
    }
}

const api = new ApiClient();