import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

export default function ProtectedRoute() {
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const { token, verifyToken, isAuthenticated, loading } = useAuth();
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        const isValid = await verifyToken(token);
        if (!isValid) {
          toast.error("Votre session a expiré, veuillez vous reconnecter");
        }
      }
      setIsChecking(false);
    };

    if (!loading) {
      checkAuth();
    }
  }, [token, loading, verifyToken]);

  // Attendre que l'AuthProvider et la vérification soient terminés
  if (loading || isChecking) {
    return (
      <ClipLoader
        color="#f97316"
        size={24}
        className="mx-auto mt-20"
        aria-label="Loading..."
      />
    );
  }

  // Si pas de token ou pas authentifié, rediriger vers la page d'accueil
  if (!token || !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
