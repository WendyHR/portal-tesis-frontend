// Configuración de la API con fallback automático
const AZURE_API_URL = 'https://portal-tesis-backend-g3bfedesdvbsc6az.centralus-01.azurewebsites.net/api';
const LOCAL_API_URL = 'http://127.0.0.1:5000/api';

class ApiClient {
    constructor() {
        this.azureURL = AZURE_API_URL;
        this.localURL = LOCAL_API_URL;
        this.baseURL = null; // Se determinará dinámicamente
        this.token = localStorage.getItem('token');
        this.backendStatus = 'unknown'; // 'azure', 'local', 'none'
    }

    // Detectar qué backend está disponible
    async detectAvailableBackend() {
        console.log('🔍 Detectando backend disponible...');
        
        // Primero intentar Azure
        try {
            const response = await fetch(`${this.azureURL}/health`, {
                method: 'GET',
                timeout: 5000 // 5 segundos máximo
            });
            
            if (response.ok) {
                this.baseURL = this.azureURL;
                this.backendStatus = 'azure';
                console.log('✅ Backend Azure disponible');
                return 'azure';
            }
        } catch (error) {
            console.log('❌ Backend Azure no disponible:', error.message);
        }

        // Si Azure falla, intentar local
        try {
            const response = await fetch(`${this.localURL}/health`, {
                method: 'GET',
                timeout: 3000 // 3 segundos máximo
            });
            
            if (response.ok) {
                this.baseURL = this.localURL;
                this.backendStatus = 'local';
                console.log('✅ Backend local disponible');
                return 'local';
            }
        } catch (error) {
            console.log('❌ Backend local no disponible:', error.message);
        }

        // Ninguno disponible
        this.backendStatus = 'none';