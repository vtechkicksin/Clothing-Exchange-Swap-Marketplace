// API base URL for endpoints
// In development: http://localhost:8080/api
// In production: can be configured via VITE_API_BASE_URL
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

// Backend base URL for static assets
// In development: http://localhost:8080
// In production: can be configured via VITE_BACKEND_URL
export const BACKEND_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

export { API_BASE_URL };

export const apiRequest = async (endpoint, options = {}) => {
  const {
    headers = {},
    body,
    method = "GET",
    isFormData = false,
    credentials = "include",
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
    throw new Error(
      typeof data === "object" && data && data.message
        ? data.message
        : "Request failed",
    );
  }

  return data;
};
