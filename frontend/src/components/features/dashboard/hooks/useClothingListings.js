import { useState, useEffect } from "react";
import { getClothingListings } from "../services/clothingListingsService";

/**
 * Custom hook to fetch clothing listings
 * Manages loading, error, and data states
 */
export const useClothingListings = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getClothingListings();
        setListings(response.data || []);
      } catch (err) {
        setError(
          err.message ||
            "Failed to load clothing listings. Please try again later.",
        );
        setListings([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  return {
    listings,
    isLoading,
    error,
  };
};
