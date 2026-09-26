// Set up Sequelize model associations
// This file should be required once when the server starts

const User = require("../models/User");
const Category = require("../models/Category");
const ClothingItem = require("../models/ClothingItem");
const ClothingImage = require("../models/ClothingImage");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

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

Conversation.belongsTo(User, { foreignKey: "user_one_id", as: "userOne" });
Conversation.belongsTo(User, { foreignKey: "user_two_id", as: "userTwo" });
Conversation.hasMany(Message, {
  foreignKey: "conversation_id",
  as: "messages",
});
Message.belongsTo(Conversation, {
  foreignKey: "conversation_id",
  as: "conversation",
});
Message.belongsTo(User, { foreignKey: "sender_id", as: "sender" });
