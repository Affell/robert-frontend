import axios from "axios";
import { Config } from "../config/global";
import { getFetch } from "./fetch";

const APIManager = axios.create({
  baseURL: Config.Urls.API,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Interface pour les données utilisateur
export interface UserData {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
}

// Fonction pour récupérer les informations de l'utilisateur connecté
export const getUserInfo = async (token: string): Promise<UserData | null> => {
  try {
    const response = await getFetch("/auth/me", {
      "Robert-Connect-Token": token,
    });

    if (response.status === 200) {
      return response.data as UserData;
    } else if (response.status === 401) {
      console.error("Token incorrect ou expiré");
      return null;
    } else {
      console.error(
        "Erreur lors de la récupération des données utilisateur:",
        response.error
      );
      return null;
    }
  } catch (error) {
    console.error("Erreur API:", error);
    return null;
  }
};

export default APIManager;
