const API_CONFIG = {
    BASE_URL: 'https://cryptoplatform-api.azurewebsites.net/api',
    TOKEN_KEY: 'crypto_platform_token',
    USER_KEY: 'crypto_platform_user'
};

// desativar alertas do browser
window.alert = function() {};
window.confirm = function() { return true; };