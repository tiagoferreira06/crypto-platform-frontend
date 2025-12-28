// guardar token e user
function saveAuth(token, user) {
    localStorage.setItem(API_CONFIG.TOKEN_KEY, token);
    localStorage.setItem(API_CONFIG.USER_KEY, JSON.stringify(user));
}

// obter token
function getToken() {
    return localStorage.getItem(API_CONFIG.TOKEN_KEY);
}

// obter utilizador
function getUser() {
    const user = localStorage.getItem(API_CONFIG.USER_KEY);
    return user ? JSON.parse(user) : null;
}

// verificar se esta autenticado
function isAuthenticated() {
    return getToken() !== null;
}

// logout
function logout() {
    localStorage.removeItem(API_CONFIG.TOKEN_KEY);
    localStorage.removeItem(API_CONFIG.USER_KEY);
    window.location.href = 'index.html';
}

// verificar autenticaçao ao carregar pagina
function checkAuth() {
    if (!isAuthenticated() && !window.location.pathname.includes('index.html')) {
        window.location.href = 'index.html';
    }
}

// redirecionar se ja estiver autenticado
function redirectIfAuthenticated() {
    if (isAuthenticated()) {
        window.location.href = 'dashboard.html';
    }
}