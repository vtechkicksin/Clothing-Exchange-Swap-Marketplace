const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SwapTransactionItem = sequelize.define(
  "SwapTransactionItem",
  {
    transaction_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "swap_transactions",
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

    owner_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    tableName: "swap_transaction_items",
    timestamps: false,
  }
);

module.exports = SwapTransactionItem;