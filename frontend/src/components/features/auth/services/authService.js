import { apiGet, apiPost } from "../../../../config/api";
import { ENDPOINTS } from "../../../../config/endpoints";

export const loginUser = (payload) =>
  apiPost(ENDPOINTS.auth.login, payload, { skipUnauthorizedRedirect: true });

export const registerUser = (payload) =>
  apiPost(ENDPOINTS.auth.register, payload, {
    skipUnauthorizedRedirect: true,
  });

export const getCurrentUser = async () => {
  try {
    const data = await apiGet(ENDPOINTS.auth.me, {
      skipUnauthorizedRedirect: true,
    });
    return data.user || null;
  } catch {
    return null;
  }
};

export const logoutUser = () =>
  apiPost(ENDPOINTS.auth.logout, undefined, { skipUnauthorizedRedirect: true });
