const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SwapTransaction = sequelize.define(
  "SwapTransaction",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    swap_request_id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      references: {
        model: "swap_requests",
        key: "id",
      },
    },

    status: {
      type: DataTypes.ENUM(
        "ACCEPTED",
        "IN_PROGRESS",
        "SHIPPED",
        "COMPLETED",
        "CANCELLED"
      ),
      defaultValue: "ACCEPTED",
      allowNull: false,
    },

    exchange_method: {
      type: DataTypes.ENUM(
        "LOCAL",
        "COURIER"
      ),
      allowNull: false,
    },

    accepted_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    completed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "swap_transactions",
    timestamps: false,
  }
);

module.exports = SwapTransaction;