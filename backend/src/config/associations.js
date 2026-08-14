// Set up Sequelize model associations
// This file should be required once when the server starts

const User = require("../models/User");
const Category = require("../models/Category");
const ClothingItem = require("../models/ClothingItem");
const ClothingImage = require("../models/ClothingImage");

// ClothingItem belongs to User (owner)
ClothingItem.belongsTo(User, {
  foreignKey: "owner_id",
  as: "owner",
});

// ClothingItem belongs to Category
ClothingItem.belongsTo(Category, {
  foreignKey: "category_id",
  as: "category",
});

// ClothingItem has many ClothingImages
ClothingItem.hasMany(ClothingImage, {
  foreignKey: "clothing_item_id",
  as: "clothingImages",
});

// ClothingImage belongs to ClothingItem
ClothingImage.belongsTo(ClothingItem, {
  foreignKey: "clothing_item_id",
  as: "clothingItem",
});

// User has many ClothingItems
User.hasMany(ClothingItem, {
  foreignKey: "owner_id",
  as: "listings",
});

// Category has many ClothingItems
Category.hasMany(ClothingItem, {
  foreignKey: "category_id",
  as: "items",
});
