import { apiGet, apiPostForm, BACKEND_BASE_URL } from "../../../../config/api";
import { ENDPOINTS } from "../../../../config/endpoints";

export const getListings = () => apiGet(ENDPOINTS.listings.all);

export const getListingById = (id) => apiGet(ENDPOINTS.listings.byId(id));

export const getListingsByUserId = (userId) =>
  apiGet(ENDPOINTS.listings.byUser(userId));

export const createListing = (formData) =>
  apiPostForm(ENDPOINTS.items.create, formData);

export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;

  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  if (imagePath.startsWith("/")) {
    return `${BACKEND_BASE_URL}${imagePath}`;
  }

  return `${BACKEND_BASE_URL}/${imagePath}`;
};

export const getPrimaryImage = (images = []) => {
  if (!Array.isArray(images) || images.length === 0) {
    return null;
  }

  const primaryImage = images.find((img) => img.is_primary);
  return primaryImage || images[0];
};

export const formatCondition = (condition) => {
  if (!condition) return "";
  return condition
    .split("_")
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(" ");
};
