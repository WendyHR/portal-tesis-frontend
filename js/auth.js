document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const messageDiv = document.getElementById('message');
            
            try {
                const result = await api.login(email, password);
                
                if (result.success) {
                    messageDiv.innerHTML = '<div class="alert alert-success">Login exitoso!</div>';
                    // Redirigir al dashboard
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 1000);
                } else {
                    messageDiv.innerHTML = `<div class="alert alert-danger">${result.message}</div>`;
                }
            } catch (error) {
                messageDiv.innerHTML = '<div class="alert alert-danger">Error de conexión</div>';
            }
        });
    }
});