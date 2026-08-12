const items = [
  {
    name: "Denim Jacket",
    size: "Size: M",
    status: "Good",
    likes: 12,
    comments: 2,
    color: "#dfe7f0",
  },
  {
    name: "Floral Dress",
    size: "Size: S",
    status: "Like New",
    likes: 8,
    comments: 1,
    color: "#e9f2db",
  },
  {
    name: "White Sneakers",
    size: "Size: 8",
    status: "Good",
    likes: 15,
    comments: 3,
    color: "#f8f8f8",
  },
  {
    name: "Handbag",
    size: "Like New",
    status: "Good",
    likes: 6,
    comments: 1,
    color: "#efe3d7",
  },
];

const ListingCard = () => {
  return (
    <div className="listing-section panel-box">
      <div className="panel-header">
        <h3>Recent Listings</h3>
        <button type="button" className="text-link">
          View All
        </button>
      </div>

      <div className="listing-grid">
        {items.map((item) => (
          <article key={item.name} className="listing-item">
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
              <div className="item-submeta">{item.size}</div>
              <div className="item-status">{item.status}</div>
            </div>
            <div className="item-stats">
              <span>♡ {item.likes}</span>
              <span>💬 {item.comments}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ListingCard;
