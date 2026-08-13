export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

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
