import { apiRequest, BACKEND_BASE_URL } from "../../../../config/api";

/**
 * Fetch all clothing listings with images
 */
export const getClothingListings = async () => {
  try {
    const response = await apiRequest("/listings", {
      method: "GET",
    });
    return response;
  } catch (error) {
    console.error("Error fetching clothing listings:", error);
    throw error;
  }
};

/**
 * Get the full image URL from relative path
 * The backend returns relative paths like "/uploads/image.jpg"
 * This function constructs the complete URL: http://localhost:8080/uploads/image.jpg
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;

  // If it's already an absolute URL, return as is
  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  // For relative paths (e.g., "/uploads/..."), prepend backend base URL
  if (imagePath.startsWith("/")) {
    return `${BACKEND_BASE_URL}${imagePath}`;
  }

  // Fallback: treat as relative to backend base URL
  return `${BACKEND_BASE_URL}/${imagePath}`;
};

/**
 * Get primary image from images array
 * Falls back to first image if no primary image exists
 */
export const getPrimaryImage = (images = []) => {
  if (!Array.isArray(images) || images.length === 0) {
    return null;
  }

  const primaryImage = images.find((img) => img.is_primary);
  return primaryImage || images[0];
};

/**
 * Format condition string for display
 * e.g., "LIKE_NEW" -> "Like New"
 */
export const formatCondition = (condition) => {
  if (!condition) return "";
  return condition
    .split("_")
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(" ");
};
