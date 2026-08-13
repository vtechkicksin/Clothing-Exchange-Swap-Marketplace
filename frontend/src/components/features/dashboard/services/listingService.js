import { apiRequest } from "../../../../config/api";

export const createListing = async (formData) => {
  return apiRequest("/items", {
    method: "POST",
    isFormData: true,
    body: formData,
  });
};
