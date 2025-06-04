import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { getFetch, postFetch } from "../api/fetch";
import { toast } from "react-toastify";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  verifyToken: (token: string) => Promise<boolean>; // Retourne un boolean
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    if (savedToken) {
      setToken(savedToken);
      // Vérifie le token automatiquement au chargement
      verifyToken(savedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const login = (newToken: string) => {
    setToken(newToken);
    setIsAuthenticated(true);
    localStorage.setItem("authToken", newToken);
  };

  const logout = async () => {
    const response = await postFetch(
      "/auth/logout",
      {},
      {
        "Robert-Connect-Token": token,
      }
    );
    if (response?.status === 200) {
      toast.success("Déconnexion réussie");
      setToken(null);
      setIsAuthenticated(false);
      localStorage.removeItem("authToken");
    } else {
      toast.error("Erreur lors de la déconnexion");
    }
  };
  const verifyToken = async (token: string): Promise<boolean> => {
    try {
      const response = await getFetch("/auth/me", {
        "Robert-Connect-Token": token,
      });

      // Vérifier le status code et les données
      if (response.status === 200) {
        setIsAuthenticated(true);
        setLoading(false);
        return true;
      } else {
        setIsAuthenticated(false);
        setLoading(false);
        // Ne pas rediriger automatiquement ici - laisser les routes protégées gérer ça
        // Supprimer le token invalide du localStorage
        localStorage.removeItem("authToken");
        setToken(null);
        return false;
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      setIsAuthenticated(false);
      setLoading(false);
      // Supprimer le token en cas d'erreur
      localStorage.removeItem("authToken");
      setToken(null);
      return false;
    }
  };

  const value = {
    isAuthenticated,
    token,
    login,
    logout,
    verifyToken,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
