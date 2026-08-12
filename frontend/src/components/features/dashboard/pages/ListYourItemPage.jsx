import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ListYourItemPage.css";

const maxPhotos = 6;

const formOptions = {
  category: [
    "Select Category",
    "BAG",
    "DRESS",
    "JACKET",
    "JEANS",
    "SHIRT",
    "SHOES",
  ],
  size: ["Select Size", "XS", "S", "M", "L", "XL"],
  condition: ["Select Condition", "Like New", "Good", "Fair"],
};

const initialFormState = {
  category: "",
  itemName: "",
  brand: "",
  size: "",
  condition: "",
  estimatedValue: "",
  description: "",
  location: "",
  availableForSwap: true,
};

const ListYourItemPage = ({ onLogout }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormState);
  const [selectedImages, setSelectedImages] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const previewImages = useMemo(
    () =>
      selectedImages.map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      })),
    [selectedImages],
  );

  useEffect(() => {
    return () => {
      previewImages.forEach(({ previewUrl }) =>
        URL.revokeObjectURL(previewUrl),
      );
    };
  }, [previewImages]);

  const visibleThumbs = useMemo(() => {
    if (selectedImages.length <= 3) {
      return selectedImages;
    }

    const maxStart = Math.max(0, selectedImages.length - 3);
    const startIndex = Math.min(activeImageIndex, maxStart);

    return selectedImages.slice(startIndex, startIndex + 3);
  }, [activeImageIndex, selectedImages]);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate("/");
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageSelect = (event) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter((file) => file.type.startsWith("image/"));
    const combinedFiles = [...selectedImages, ...validFiles].slice(
      0,
      maxPhotos,
    );
    setSelectedImages(combinedFiles);
    setActiveImageIndex(0);
    event.target.value = "";
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) =>
      Math.min(prev + 1, selectedImages.length - 1),
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      ...formData,
      estimatedValue: Number(formData.estimatedValue) || 0,
      availableForSwap: Boolean(formData.availableForSwap),
      selectedImages,
    };

    const formDataToSend = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      if (key === "selectedImages") {
        selectedImages.forEach((file) => {
          formDataToSend.append("images", file);
        });
        return;
      }

      formDataToSend.append(key, value);
    });

    console.log("Listing payload for multer backend: >>>>>>>>>", payload);
    // console.log("Files selected for upload: >>>>>>>>>", selectedImages);
    // console.log("FormData ready for API:", formDataToSend);
  };

  return (
    <div className="list-item-page">
      <div className="page-topbar">
        <div className="topbar-content">
          <div className="brand-row">
            <div className="brand-logo">
              <span className="logo-icon">◌</span>
              <div>
                <div className="brand-name">SwapStyle</div>
                <div className="brand-subtitle">
                  Exchange. Sustain. Inspire.
                </div>
              </div>
            </div>

            <nav className="main-nav" aria-label="Main navigation">
              {[
                "Dashboard",
                "Browse Items",
                "List Your Item",
                "Chat Support",
                "Calendar",
              ].map((item, index) => (
                <button
                  key={item}
                  type="button"
                  className={index === 2 ? "nav-link active" : "nav-link"}
                  onClick={() => {
                    if (item === "Dashboard") navigate("/dashboard");
                    if (item === "List Your Item") navigate("/list-item");
                  }}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>

          <div className="profile-mini">
            <button
              type="button"
              className="icon-button"
              aria-label="Notifications"
            >
              🔔
            </button>
            <div className="user-chip">
              <div className="avatar">N</div>
              <span>Neha Sharma</span>
            </div>
            <button
              type="button"
              className="secondary-action"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <main className="listing-shell">
        <div className="listing-header-row">
          <h1>List Your Item</h1>
          <p>Share your pre-loved item and find the perfect swap!</p>
        </div>

        <form onSubmit={handleSubmit} className="listing-content-grid">
          <section className="form-panel-card">
            <h2>Item Details</h2>

            <div className="field-group">
              <label>
                <span>Category</span>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  {formOptions.category.map((option) => (
                    <option
                      key={option}
                      value={option === "Select Category" ? "" : option}
                      disabled={option === "Select Category"}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="field-group">
              <label>
                <span>Item Name</span>
                <input
                  type="text"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleChange}
                  placeholder="e.g. Denim Jacket"
                />
              </label>
            </div>

            <div className="field-group">
              <label>
                <span>Brand</span>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="e.g. Zara"
                />
              </label>
            </div>

            <div className="field-group">
              <label>
                <span>Size</span>
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                >
                  {formOptions.size.map((option) => (
                    <option
                      key={option}
                      value={option === "Select Size" ? "" : option}
                      disabled={option === "Select Size"}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="field-group">
              <label>
                <span>Condition</span>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                >
                  {formOptions.condition.map((option) => (
                    <option
                      key={option}
                      value={option === "Select Condition" ? "" : option}
                      disabled={option === "Select Condition"}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="field-group">
              <label>
                <span>Estimated Swap Value</span>
                <input
                  type="number"
                  name="estimatedValue"
                  value={formData.estimatedValue}
                  onChange={handleChange}
                  placeholder="e.g. 450"
                />
              </label>
              <small>Our calculator will help you estimate value</small>
            </div>

            <div className="field-group textarea-wrap">
              <label>
                <span>Description</span>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your item, its condition, color, material, etc."
                  rows="5"
                />
              </label>
            </div>
          </section>

          <aside className="sidebar-stack">
            <section className="image-panel-card">
              <h2>Item Images</h2>

              <label className="upload-box" htmlFor="item-images">
                <div className="upload-icon">⇪</div>
                <div>Upload Images</div>
                <small>Drag &amp; drop or click to upload</small>
                <small>Upload up to {maxPhotos} images</small>
                <input
                  id="item-images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelect}
                  hidden
                />
              </label>

              <div className="upload-carousel">
                {selectedImages.length > 0 ? (
                  <>
                    <div className="preview-stage">
                      <img
                        src={previewImages[activeImageIndex]?.previewUrl}
                        alt={
                          previewImages[activeImageIndex]?.file?.name ||
                          "selected image"
                        }
                      />
                      <div className="image-counter">
                        {activeImageIndex + 1}/{selectedImages.length}
                      </div>
                    </div>

                    <div className="thumbnail-slider">
                      <button
                        type="button"
                        className="slider-arrow"
                        onClick={handlePrevImage}
                        disabled={activeImageIndex === 0}
                        aria-label="Previous image"
                      >
                        ‹
                      </button>

                      <div className="thumb-window">
                        <div className="thumb-track">
                          {visibleThumbs.map((file, index) => {
                            const absoluteIndex = selectedImages.indexOf(file);
                            const previewUrl =
                              previewImages[absoluteIndex]?.previewUrl;

                            return (
                              <button
                                key={`${file.name}-${absoluteIndex}`}
                                type="button"
                                className={
                                  absoluteIndex === activeImageIndex
                                    ? "thumb-slide active"
                                    : "thumb-slide"
                                }
                                onClick={() =>
                                  setActiveImageIndex(absoluteIndex)
                                }
                              >
                                <img src={previewUrl} alt={file.name} />
                                <span>{file.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <button
                        type="button"
                        className="slider-arrow"
                        onClick={handleNextImage}
                        disabled={activeImageIndex >= selectedImages.length - 1}
                        aria-label="Next image"
                      >
                        ›
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="placeholder-gallery">
                    <div className="thumb" />
                    <div className="thumb" />
                    <div className="thumb" />
                  </div>
                )}
              </div>
            </section>

            <section className="detail-panel-card">
              <h2>Location</h2>
              <div className="location-input">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter your city"
                />
                <span>◌</span>
              </div>
            </section>

            <section className="detail-panel-card availability-card">
              <h2>Availability</h2>
              <label className="availability-option">
                <input
                  type="radio"
                  name="availableForSwap"
                  checked={formData.availableForSwap === true}
                  onChange={() =>
                    setFormData((prev) => ({ ...prev, availableForSwap: true }))
                  }
                />
                <span>Available for Swap</span>
              </label>
              <label className="availability-option">
                <input
                  type="radio"
                  name="availableForSwap"
                  checked={formData.availableForSwap === false}
                  onChange={() =>
                    setFormData((prev) => ({
                      ...prev,
                      availableForSwap: false,
                    }))
                  }
                />
                <span>Not Available</span>
              </label>
            </section>

            <button type="submit" className="publish-button">
              Publish Listing
            </button>
          </aside>
        </form>
      </main>
    </div>
  );
};

export default ListYourItemPage;
