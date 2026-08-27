export const ENDPOINTS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    me: "/auth/me",
    logout: "/auth/logout",
  },
  listings: {
    all: "/listings",
    byId: (id) => `/listings/${id}`,
    byUser: (userId) => `/listings/user/${userId}`,
  },
  items: {
    create: "/items",
  },
};
