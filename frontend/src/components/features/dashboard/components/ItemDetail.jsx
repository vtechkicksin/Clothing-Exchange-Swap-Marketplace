import { useState } from "react";
import {
  getImageUrl,
  formatCondition,
} from "../services/clothingListingsService";
import "./ItemDetail.css";

const ItemDetail = ({ item, onBack }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const images = item?.images || [];

  const ownerName = item?.owner?.name || "Unknown User";

  const currentImage = images[selectedImage];

  const handlePreviousImage = () => {
    setSelectedImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };
  const handleNextImage = () => {
    setSelectedImage((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  if (!item) {
    return null;
  }

  return (
    <div className="item-detail panel-box">
      {/* Back */}
      <button
        type="button"
        className="item-detail-back"
        onClick={onBack}
      >
        ← Back to Browse
      </button>

      <div className="item-detail-content">
        {/* ================= LEFT: IMAGE GALLERY ================= */}
        <div className="item-gallery">
          <div className="item-main-image-container">
            {currentImage ? (
              <img
                src={getImageUrl(currentImage.image_url)}
                alt={item.title}
                className="item-main-image"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            ) : (
              <div className="item-no-image">
                No image available
              </div>
            )}

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  className="gallery-arrow gallery-arrow-left"
                  onClick={handlePreviousImage}
                  aria-label="Previous image"
                >
                  ‹
                </button>

                <button
                  type="button"
                  className="gallery-arrow gallery-arrow-right"
                  onClick={handleNextImage}
                  aria-label="Next image"
                >
                  ›
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 0 && (
            <div className="item-thumbnails">
              {images.map((image, index) => (
                <button
                  type="button"
                  key={image.id || index}
                  className={`item-thumbnail ${
                    selectedImage === index ? "selected" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={getImageUrl(image.image_url)}
                    alt={`${item.title} ${index + 1}`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ================= RIGHT: ITEM INFORMATION ================= */}
        <div className="item-information">
          <div className="item-title-section">
            <h1>{item.title || "Untitled"}</h1>

            <button
              type="button"
              className="item-favorite-button"
              onClick={() => setIsFavorite((prev) => !prev)}
              aria-label={
                isFavorite
                  ? "Remove from favorites"
                  : "Add to favorites"
              }
            >
              {isFavorite ? "♥" : "♡"}
            </button>
          </div>

          {/* Badges */}
          <div className="item-badges">
            {item.size && (
              <span className="item-badge">
                Size: {item.size}
              </span>
            )}

            {item.condition && (
              <span className="item-badge">
                {formatCondition(item.condition)}
              </span>
            )}

            {item.brand && (
              <span className="item-badge item-brand-badge">
                {item.brand}
              </span>
            )}
          </div>

          {/* Swap Value */}
          <div className="item-detail-value">
            <span>Estimated Swap Value</span>

            <div className="item-value-amount">
              ₹{" "}
              {item.estimated_swap_value
                ? parseFloat(item.estimated_swap_value).toFixed(0)
                : "0"}
              <span className="swap-icon">◆</span>
            </div>
          </div>

          {/* Location */}
          <div className="item-detail-location">
            <span className="detail-label">Location</span>

            <div className="location-value">
              <span>⌖</span>

              <span>
                {item.city || "Location unavailable"}
              </span>

              {item.distance && (
                <span className="distance">
                  • {item.distance} km away
                </span>
              )}
            </div>
          </div>

          {/* Owner */}
          <div className="item-listed-by">
            <span className="detail-label">Listed by</span>

            <div className="owner-container">
              <div className="owner-avatar">
                {ownerName.charAt(0).toUpperCase()}
              </div>

              <div className="owner-details">
                <div className="owner-name">
                  {ownerName}
                </div>

                <div className="owner-rating">
                  <span>★</span> 4.8 (2 reviews)
                </div>

                <div className="owner-member">
                  Member since Jan 2023
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="item-description">
            <h3>Description</h3>

            <p>
              {item.description ||
                "No description provided for this item."}
            </p>
          </div>

          {/* Actions */}
          <div className="item-actions">
            <button
              type="button"
              className="send-swap-button"
            >
              Send Swap Request
            </button>

            <button
              type="button"
              className="chat-with-owner-button"
            >
              Chat with {ownerName}
            </button>
          </div>
        </div>
      </div>

      {/* ================= ITEM DETAILS ================= */}

      <div className="item-details-box">
        <h2>Item Details</h2>

        <div className="item-details-grid">
          <div className="detail-item">
            <span>Category</span>
            <strong>
              {item.category?.name || "-"}
            </strong>
          </div>

          <div className="detail-item">
            <span>Color</span>
            <strong>{item.color || "-"}</strong>
          </div>

          <div className="detail-item">
            <span>Condition</span>
            <strong>
              {item.condition
                ? formatCondition(item.condition)
                : "-"}
            </strong>
          </div>

          <div className="detail-item">
            <span>Material</span>
            <strong>{item.material || "-"}</strong>
          </div>

          <div className="detail-item">
            <span>Brand</span>
            <strong>{item.brand || "-"}</strong>
          </div>

          <div className="detail-item">
            <span>Sleeve</span>
            <strong>{item.sleeve || "Sleeveless"}</strong>
          </div>

          <div className="detail-item">
            <span>Size</span>
            <strong>{item.size || "-"}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;