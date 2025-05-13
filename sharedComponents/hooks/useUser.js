import { Roles } from "./roles";

export function useUser() {
  return {
    fullName: "Mohamed Salam",
    role: Roles.RESPONSABLE, // Change ici pour tester d'autres rôles
    email: "mohamed.salam@um6p.ma",
    isAuthenticated: true,
  };
}
