// Relative /api uses the Vite dev proxy; override via VITE_API_BASE_URL in production.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_PROD || "/api";

// Backend base URL for static assets (e.g. uploaded images)
export const BACKEND_BASE_URL =
  import.meta.env.VITE_BACKEND_URL_PROD || "http://localhost:8080";

export { API_BASE_URL };

let onUnauthorized = null;

export const setUnauthorizedHandler = (handler) => {
  onUnauthorized = handler;
};

export const apiRequest = async (endpoint, options = {}) => {
  const {
    headers = {},
    body,
    method = "GET",
    isFormData = false,
    credentials = "include",
    skipUnauthorizedRedirect = false,
    ...rest
  } = options;

  const requestHeaders = isFormData
    ? headers
    : {
        "Content-Type": "application/json",
        ...headers,
      };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    credentials,
    headers: requestHeaders,
    body: body !== undefined ? body : undefined,
    ...rest,
  });

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json().catch(() => ({}))
    : await response.text();

  if (!response.ok) {
    if (
      response.status === 401 &&
      !skipUnauthorizedRedirect &&
      onUnauthorized
    ) {
      onUnauthorized();
    }

    throw new Error(
      typeof data === "object" && data && data.message
        ? data.message
        : "Request failed",
    );
  }

  return data;
};

export const apiGet = (endpoint, options = {}) =>
  apiRequest(endpoint, { ...options, method: "GET" });

export const apiPost = (endpoint, body, options = {}) =>
  apiRequest(endpoint, {
    ...options,
    method: "POST",
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

export const apiPostForm = (endpoint, formData, options = {}) =>
  apiRequest(endpoint, {
    ...options,
    method: "POST",
    isFormData: true,
    body: formData,
  });
