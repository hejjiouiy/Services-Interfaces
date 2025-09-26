import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UserAvatar from './UserAvatar';
import { getCurrentUser } from '../../../../utils/authHelpers';

const UserInfo = ({ isMobile }) => {
  const [userInfo, setUserInfo] = useState({
    name: "", // valeur par défaut
    title: "" // valeur par défaut
  });
    const router = useRouter();


  useEffect(() => {
    // Récupérer les infos de l'utilisateur connecté
    const user = getCurrentUser();
    
    if (!user) {

      router.push('/login'); // Rediriger vers la page de connexion si pas d'utilisateur
      return;

      
    }
    else{
      // Construire le nom complet
      const fullName = user.name 
        ? `${user.name}`
        : user.email || user.username || "Utilisateur";

      // Récupérer le titre/fonction
      const email = user.email || "Utilisateur";
      const roles = user.roles || [];

      // Exemple : supprimer un rôle spécifique, par exemple "admin"
      const filteredRoles = roles.filter(role => role !== "default-roles-fms");

      setUserInfo({
        name: fullName,
        email: email,
        roles: "Roles : " + filteredRoles.join(' * ') || "Aucun rôle"
      });
    }
  }, []);

  return (
    <div className={`flex items-center ${isMobile ? 'flex-1 mx-4' : ''}`}>
      <UserAvatar isMobile={isMobile} />
      
      <div className={`${isMobile ? ' sm:block' : ''}`}>
        <h1 className={`text-gray-600 ${isMobile ? 'text-sm' : 'text-sm lg:text-md'}`}>
          <span className={`font-bold text-black ${isMobile ? 'text-base' : 'text-lg lg:text-2xl'}`}>
            {userInfo.name}
          </span>
          {!isMobile && <br />}
          <span className={isMobile ? 'block text-xs' : 'text-gray-600'}>
            {userInfo.email}
          </span>
          <br />
          <span className={isMobile ? 'block text-xs' : 'text-xs text-gray-400'}>
            {userInfo.roles}
            </span>
        </h1>
      </div>
    </div>
  );
};

export default UserInfo;