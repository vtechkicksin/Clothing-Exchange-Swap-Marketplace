const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SwapRequestItem = sequelize.define(
  "SwapRequestItem",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    swap_request_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "swap_requests",
        key: "id",
      },
    },

    clothing_item_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "clothing_items",
        key: "id",
      },
    },

    role: {
      type: DataTypes.ENUM(
        "OFFERED",
        "REQUESTED"
      ),
      allowNull: false,
    },
  },
  {
    tableName: "swap_request_items",
    timestamps: false,
  }
);

module.exports = SwapRequestItem;