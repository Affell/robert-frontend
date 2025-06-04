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
