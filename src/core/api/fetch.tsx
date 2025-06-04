import { Config } from "../config/global";

export async function getFetch(route: string, headers?: any) {
  try {
    const response = await fetch(`${Config.Urls.API}${route}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });

    // Vérifier si la réponse est OK (status entre 200 et 299)
    if (!response.ok) {
      // Créer et lancer une erreur avec le statut HTTP
      const error: any = new Error(`HTTP error! Status: ${response.status}`);
      error.status = response.status;

      try {
        // Essayer de récupérer les détails de l'erreur depuis la réponse JSON
        error.data = await response.json();
      } catch (jsonError) {
        // Si ce n'est pas du JSON, utiliser le texte de la réponse
        try {
          const text = await response.text();
          error.data = { message: text || "Erreur inconnue" };
        } catch (textError) {
          error.data = { message: "Impossible de lire la réponse" };
        }
      }

      throw error;
    }

    // Handle empty responses (no content)
    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      return null; // Return null for non-JSON responses
    }
  } catch (err: any) {
    // Si l'erreur a déjà été traitée (avec status), on la propage
    if (err.status) {
      throw err;
    }

    // Sinon, c'est une erreur non-HTTP (réseau, parsing JSON, etc.)
    console.error("Fetch error:", err);
    const networkError: any = new Error("Erreur de connexion au serveur");
    networkError.status = 0; // Code personnalisé pour les erreurs réseau
    networkError.originalError = err;
    throw networkError;
  }
}

export async function postFetch(route: string, data: any, headers?: any) {
  try {
    // Check if data is FormData to handle it properly
    const isFormData = data instanceof FormData;

    const response = await fetch(`${Config.Urls.API}${route}`, {
      method: "POST",
      headers: {
        // Don't set Content-Type for FormData, it will be set automatically with boundary
        ...(!isFormData && { "Content-Type": "application/json" }),
        ...headers,
      },
      body: isFormData ? data : JSON.stringify(data),
    });

    // Check if response is JSON
    const contentType = response.headers.get("Content-Type") || "";

    if (contentType.includes("application/json")) {
      const responseData = await response.json();
      return { status: response.status, data: responseData };
    } else {
      // Handle non-JSON response
      return {
        status: response.status,
        data: null,
        error: "Received non-JSON response from server",
      };
    }
  } catch (err: any) {
    console.error("Fetch error:", err);
    return { status: 500, data: null, error: err.message };
  }
}
