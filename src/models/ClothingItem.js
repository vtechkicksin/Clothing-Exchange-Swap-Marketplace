const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ClothingItem = sequelize.define(
  "ClothingItem",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    owner_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },

    category_id: {
      type: DataTypes.STRING(20),
      allowNull: false,
      references: {
        model: "categories",
        key: "id",
      },
    },

    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },

    brand: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    size: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    condition: {
      type: DataTypes.ENUM(
        "NEW",
        "LIKE_NEW",
        "GOOD",
        "FAIR"
      ),
      allowNull: false,
    },

    color: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    material: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    estimated_swap_value: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },

    city: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    latitude: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: true,
    },

    longitude: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM(
        "AVAILABLE",
        "RESERVED",
        "SWAPPED",
        "REMOVED"
      ),
      defaultValue: "AVAILABLE",
      allowNull: false,
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    tableName: "clothing_items",
    timestamps: false,
  }
);

module.exports = ClothingItem;