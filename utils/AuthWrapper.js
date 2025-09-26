'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { TokenManager } from './authHelpers';

// Pages qui ne nécessitent pas de connexion
const PUBLIC_PAGES = ['/login', '/register', '/forgot-password', '/'];

export default function AuthWrapper({ children }) {
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Vérifier si on est sur une page publique
    const isPublicPage = PUBLIC_PAGES.includes(pathname);
    
    if (isPublicPage) {
      setIsChecking(false);
      return;
    }

    // Pour les autres pages, vérifier si l'utilisateur est connecté
    const checkAuth = () => {
      const hasToken = TokenManager.getAccessToken();
      const hasUser = TokenManager.getUser();
      const isTokenValid = !TokenManager.isTokenExpired();

      // Si pas de token, pas d'utilisateur, ou token expiré -> rediriger vers login
      if (!hasToken || !hasUser || !isTokenValid) {
        router.push('/login');
        return;
      }

      setIsChecking(false);
    };

    checkAuth();
  }, [pathname, router]);

  // Afficher un loader pendant la vérification
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-main-green"></div>
      </div>
    );
  }

  return children;
}