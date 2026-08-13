import { apiRequest } from "../../../../config/api";

const request = async (endpoint, payload) => {
  return apiRequest(endpoint, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

export const loginUser = async (payload) => {
  return request("/auth/login", payload);
};

export const registerUser = async (payload) => {
  return request("/auth/register", payload);
};
