import { useState, useEffect } from "react";
import { getListings } from "../services/listingsService";

export const useClothingListings = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getListings();
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
