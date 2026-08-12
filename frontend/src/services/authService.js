import { API_BASE_URL } from "../config/api";

const request = async (endpoint, payload) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};

export const loginUser = async (payload) => {
  return request("/auth/login", payload);
};

export const registerUser = async (payload) => {
  return request("/auth/register", payload);
};
