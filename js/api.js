// retorna headers com token JWT para requests autenticados
function getHeaders() {
    const token = getToken();
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
}

// auth (login e register)
async function login(username, password) {
    const response = await fetch(`${API_CONFIG.BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Login failed');
    }
    
    return await response.json();
}

// regista novo utilizador no sistema
async function register(username, email, password) {
    const response = await fetch(`${API_CONFIG.BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Registration failed');
    }
    
    return await response.json();
}

// obtem metricas agregadas do portfolio do utilizador para dashboard
async function getDashboard(userId) {
    const response = await fetch(`${API_CONFIG.BASE_URL}/dashboard/${userId}`, {
        headers: getHeaders()
    });
    
    if (!response.ok) throw new Error('Failed to fetch dashboard');
    return await response.json();
}

// obtem portfolio do utilizador com preços atualizados da CoinGecko
async function getPortfolioEnriched(userId) {
    const response = await fetch(`${API_CONFIG.BASE_URL}/portfolio/${userId}/enriched`, {
        headers: getHeaders()
    });
    
    if (!response.ok) throw new Error('Failed to fetch portfolio');
    return await response.json();
}

// obtem watchlist do utilizador
async function getWatchlist(userId) {
    const response = await fetch(`${API_CONFIG.BASE_URL}/watchlist/${userId}`, {
        headers: getHeaders()
    });
    
    if (!response.ok) throw new Error('Failed to fetch watchlist');
    return await response.json();
}

// adiciona uma moeda a watchlist do utilizador
async function addToWatchlist(userId, coinId, coinSymbol, coinName) {
    const response = await fetch(`${API_CONFIG.BASE_URL}/watchlist`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
            userId,
            coinId,
            coinSymbol,
            coinName,
            addedAt: new Date().toISOString()
        })
    });
    
    if (!response.ok) throw new Error('Failed to add to watchlist');
    return await response.json();
}

// remove uma moeda da watchlist
async function removeFromWatchlistApi(id) {
    const response = await fetch(`${API_CONFIG.BASE_URL}/watchlist/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
    });
    
    if (!response.ok) throw new Error('Failed to remove from watchlist');
}

// obtem histórico completo de transações do utilizador
async function getTransactions(userId) {
    const response = await fetch(`${API_CONFIG.BASE_URL}/transaction/${userId}`, {
        headers: getHeaders()
    });
    
    if (!response.ok) throw new Error('Failed to fetch transactions');
    return await response.json();
}

// executa uma transação de BUY de criptomoeda
async function buyTransaction(userId, coinId, coinSymbol, coinName, quantity, pricePerCoin, notes) {
    const response = await fetch(`${API_CONFIG.BASE_URL}/transaction/buy`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
            userId,
            coinId,
            coinSymbol,
            coinName,
            quantity: parseFloat(quantity),
            pricePerCoin: parseFloat(pricePerCoin),
            totalValue: 0,
            notes: notes || '',
            transactionDate: new Date().toISOString()
        })
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Transaction failed');
    }
    return await response.json();
}

// executa uma transação de SELL de criptomoeda
async function sellTransaction(userId, coinId, coinSymbol, coinName, quantity, pricePerCoin, notes) {
    const response = await fetch(`${API_CONFIG.BASE_URL}/transaction/sell`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
            userId,
            coinId,
            coinSymbol,
            coinName,
            quantity: parseFloat(quantity),
            pricePerCoin: parseFloat(pricePerCoin),
            totalValue: 0,
            notes: notes || '',
            transactionDate: new Date().toISOString()
        })
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Transaction failed');
    }
    return await response.json();
}

// obtem lista das top criptomoedas por market cap
async function getTopCryptos(limit = 10) {
    const response = await fetch(`${API_CONFIG.BASE_URL}/crypto/top?limit=${limit}`);
    
    if (!response.ok) throw new Error('Failed to fetch top cryptos');
    return await response.json();
}

// obtem dados detalhados de uma criptomoeda especifica
async function getCoinById(coinId) {
    const response = await fetch(`${API_CONFIG.BASE_URL}/crypto/${coinId}`, {
        headers: getHeaders()
    });
    
    if (!response.ok) throw new Error('Failed to fetch coin data');
    return await response.json();
}

// pesquisar criptomoedas
async function searchCoin(query) {
    try {
        const allCoins = await getTopCryptos(100);
        return allCoins.filter(coin => 
            coin.name.toLowerCase().includes(query.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(query.toLowerCase()) ||
            coin.id.toLowerCase().includes(query.toLowerCase())
        );
    } catch (error) {
        console.error('Search error:', error);
        return [];
    }
}