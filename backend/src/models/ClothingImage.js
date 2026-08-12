const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ClothingImage = sequelize.define(
  "ClothingImage",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    clothing_item_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "clothing_items",
        key: "id",
      },
    },

    image_url: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },

    is_primary: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },

    display_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "clothing_images",
    timestamps: false,
  }
);

module.exports = ClothingImage;