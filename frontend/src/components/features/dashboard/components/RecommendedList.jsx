const recommendedItems = [
  { name: "Floral Dress", color: "#edf2d7" },
  { name: "Denim Jacket", color: "#dfe7f0" },
  { name: "Yellow Dress", color: "#f7e7b4" },
];

const RecommendedList = () => {
  return (
    <div className="listing-section panel-box">
      <div className="panel-header">
        <h3>Recommended for You</h3>
        <button type="button" className="text-link">
          View All
        </button>
      </div>

      <div className="listing-grid compact-grid">
        {recommendedItems.map((item) => (
          <article key={item.name} className="listing-item recommendation-item">
            <div
              className="item-visual"
              style={{ backgroundColor: item.color }}
            >
              <button type="button" className="favorite-button">
                ♡
              </button>
            </div>
            <div className="item-meta">
              <h4>{item.name}</h4>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default RecommendedList;
