// Configuración centralizada
const CONFIG = {
    API_BASE_URL: getApiBaseUrl(),
    ENVIRONMENT: window.ENV?.ENVIRONMENT || 'development',
    APP_NAME: 'Portal de Tesis',
    VERSION: '1.0.0',
    JWT_STORAGE_KEY: 'token',
    USER_STORAGE_KEY: 'user'
};

function getApiBaseUrl() {
    // Producción: URL del backend desplegado (próxima sesión)
    if (window.location.hostname.includes('azurestaticapps.net')) {
        return 'https://portal-tesis-backend.azurewebsites.net/api';
    }
    
    // Desarrollo: backend local
    return 'http://127.0.0.1:5000/api';
}

// Export para uso en otros archivos
window.CONFIG = CONFIG;