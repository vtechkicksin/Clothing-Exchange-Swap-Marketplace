import { useState } from "react";
import { useClothingListings } from "../hooks/useClothingListings";
import {
  getPrimaryImage,
  getImageUrl,
  formatCondition,
} from "../services/clothingListingsService";
import "./ListingCard.css";
import ItemDetail from "./ItemDetail";

const ListingCard = () => {
  const { listings, isLoading, error } = useClothingListings();
  const [favorites, setFavorites] = useState(new Set());
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleFavorite = (itemId) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(itemId)) {
        newFavorites.delete(itemId);
      } else {
        newFavorites.add(itemId);
      }
      return newFavorites;
    });
  };

  const handleViewAll = () => {
    // TODO: Navigate to full listings page or open modal
    console.log("View all listings");
  };
  if (selectedItem) {
      return (
        <ItemDetail
          item={selectedItem}
          onBack={() => setSelectedItem(null)}
        />
      );
    }
  return (
    <div className="listing-section panel-box">
      <div className="panel-header">
        <h3>Recent Listings</h3>
        <button type="button" className="text-link" onClick={handleViewAll}>
          View All
        </button>
      </div>

      {isLoading && (
        <div className="listing-grid">
          <div className="listing-loading">
            <div className="loading-spinner" />
            <span className="loading-text">Loading listings...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="listing-grid">
          <div className="listing-error">
            <p>⚠ {error}</p>
          </div>
        </div>
      )}

      {!isLoading && !error && listings.length === 0 && (
        <div className="listing-grid">
          <div className="listing-empty">
            <p>No listings available yet</p>
          </div>
        </div>
      )}

      {!isLoading && !error && listings.length > 0 && (
        <div className="listing-grid">
          {listings.map((item) => {
            const primaryImage = getPrimaryImage(item.images);
            const imageUrl = primaryImage
              ? getImageUrl(primaryImage.image_url)
              : null;
            const isFavorite = favorites.has(item.id);

            return (
              <article key={item.id} className="listing-item" onClick={() => setSelectedItem(item)}>
                <div className="item-visual">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={item.title}
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : null}
                  <button
                    type="button"
                    className="favorite-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id);
                    }}
                    aria-label={
                      isFavorite ? "Remove from favorites" : "Add to favorites"
                    }
                  >
                    {isFavorite ? "♥" : "♡"}
                  </button>
                </div>

                <div className="item-meta">
                  <h4>{item.title || "Untitled"}</h4>

                  {item.brand && <div className="item-brand">{item.brand}</div>}

                  {item.size && (
                    <div className="item-submeta">Size: {item.size}</div>
                  )}

                  {item.category && (
                    <div className="item-category">{item.category.name}</div>
                  )}

                  {item.condition && (
                    <div className="item-status">
                      {formatCondition(item.condition)}
                    </div>
                  )}

                  {item.city && (
                    <div className="item-location">📍 {item.city}</div>
                  )}

                  {item.owner && (
                    <div className="item-owner">by {item.owner.name}</div>
                  )}

                  {item.estimated_swap_value && (
                    <div className="item-value">
                      ₹ {parseFloat(item.estimated_swap_value).toFixed(2)}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ListingCard;
