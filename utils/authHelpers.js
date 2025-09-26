// utils/authHelpers.js - Fonctions d'authentification pour votre app

const API_GATEWAY_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL || 'http://localhost:8000';

/**
 * Gestionnaire simple de tokens dans localStorage
 */
class TokenManager {
  static ACCESS_TOKEN_KEY = 'auth_access_token';
  static REFRESH_TOKEN_KEY = 'auth_refresh_token';
  static USER_KEY = 'auth_user';
  static TOKEN_EXPIRY_KEY = 'auth_token_expiry';

  static saveTokens(tokens, user) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.ACCESS_TOKEN_KEY, tokens.access_token);
      localStorage.setItem(this.REFRESH_TOKEN_KEY, tokens.refresh_token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      
      // Calculer l'expiration (timestamp actuel + durée du token - marge de 5 min)
      const expiryTime = Date.now() + (tokens.expires_in * 1000) - (5 * 60 * 1000);
      localStorage.setItem(this.TOKEN_EXPIRY_KEY, expiryTime.toString());
    }
  }

  static getAccessToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.ACCESS_TOKEN_KEY);
    }
    return null;
  }

  static getRefreshToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.REFRESH_TOKEN_KEY);
    }
    return null;
  }

  static getUser() {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem(this.USER_KEY);
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  }

  static isTokenExpired() {
    if (typeof window !== 'undefined') {
      const expiryStr = localStorage.getItem(this.TOKEN_EXPIRY_KEY);
      if (!expiryStr) return true;
      
      const expiryTime = parseInt(expiryStr);
      return Date.now() >= expiryTime;
    }
    return true;
  }

  static clearTokens() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.ACCESS_TOKEN_KEY);
      localStorage.removeItem(this.REFRESH_TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
      localStorage.removeItem(this.TOKEN_EXPIRY_KEY);
    }
  }

  static hasValidToken() {
    return this.getAccessToken() !== null && !this.isTokenExpired();
  }
}

/**
 * Connexion avec email et mot de passe
 */
export async function handleEmailLogin(email, password) {
  try {
    // Validation côté client
    if (!email || !password) {
      return { success: false, error: 'Email et mot de passe requis' };
    }

    // Appel à votre API Gateway
    const response = await fetch(`${API_GATEWAY_URL}/auth/login-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.trim(),
        password: password
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Gérer les différents types d'erreurs
      if (response.status === 401) {
        return { success: false, error: 'Email ou mot de passe incorrect' };
      } else if (response.status === 429) {
        return { success: false, error: 'Trop de tentatives de connexion. Veuillez réessayer plus tard.' };
      } else if (response.status >= 500) {
        return { success: false, error: 'Erreur du serveur. Veuillez réessayer plus tard.' };
      } else {
        return { success: false, error: data.detail || 'Erreur de connexion' };
      }
    }

    // Valider la structure de la réponse
    if (!data.tokens || !data.user) {
      return { success: false, error: 'Réponse du serveur invalide' };
    }

    // Sauvegarder les tokens et utilisateur
    TokenManager.saveTokens(data.tokens, data.user);
    
    console.log('✅ Connexion réussie:', data.user.username);
    
    return { success: true, user: data.user };
  } catch (error) {
    console.error('❌ Erreur de connexion:', error);
    
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return { success: false, error: 'Impossible de contacter le serveur. Vérifiez votre connexion internet.' };
    }
    
    return { success: false, error: 'Erreur de connexion. Veuillez réessayer.' };
  }
}

/**
 * Connexion avec Microsoft
 */
export async function handleMicrosoftLogin() {
  try {
    const response = await fetch(`${API_GATEWAY_URL}/auth/login-microsoft`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 429) {
        return { success: false, error: 'Trop de tentatives de connexion Microsoft. Veuillez réessayer plus tard.' };
      } else {
        return { success: false, error: data.detail || 'Erreur lors de l\'initialisation de la connexion Microsoft' };
      }
    }

    // Sauvegarder le state pour validation ultérieure
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('microsoft_oauth_state', data.state);
    }
    
    // Rediriger vers Microsoft
    window.location.href = data.auth_url;
    
    return { success: true };
  } catch (error) {
    console.error('❌ Erreur Microsoft login:', error);
    return { success: false, error: 'Erreur lors de l\'initialisation de la connexion Microsoft' };
  }
}

/**
 * Déconnexion
 */
export async function handleLogout() {
  try {
    const refreshToken = TokenManager.getRefreshToken();
    
    if (refreshToken) {
      // Notifier le serveur (ne pas échouer si ça rate)
      try {
        await fetch(`${API_GATEWAY_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            refresh_token: refreshToken 
          }),
        });
      } catch (error) {
        console.warn('Server logout failed, continuing with local logout');
      }
    }
  } catch (error) {
    console.warn('Logout error:', error);
  } finally {
    // Toujours nettoyer localement
    TokenManager.clearTokens();
    
    // Rediriger vers la page de connexion
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }
}

/**
 * Vérifier l'authentification
 */
export async function checkAuthentication() {
  try {
    // Vérifier d'abord localement
    if (!TokenManager.hasValidToken()) {
      return { authenticated: false };
    }

    const user = TokenManager.getUser();
    const accessToken = TokenManager.getAccessToken();

    if (!user || !accessToken) {
      return { authenticated: false };
    }

    // Vérifier côté serveur si nécessaire
    const serverCheck = await fetch(`${API_GATEWAY_URL}/auth/check`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const serverData = await serverCheck.json();
    
    if (!serverData.authenticated) {
      TokenManager.clearTokens();
      return { authenticated: false };
    }

    return { authenticated: true, user };
  } catch (error) {
    console.error('Auth check error:', error);
    TokenManager.clearTokens();
    return { authenticated: false };
  }
}

/**
 * Récupérer l'utilisateur connecté
 */
export function getCurrentUser() {
  return TokenManager.getUser();
}

/**
 * Vérifier les rôles
 */
export function hasRole(role) {
  const user = TokenManager.getUser();
  return user?.roles?.includes(role) || false;
}

export function hasAnyRole(roles) {
  return roles.some(role => hasRole(role));
}

// Export de TokenManager pour usage avancé si nécessaire
export { TokenManager };