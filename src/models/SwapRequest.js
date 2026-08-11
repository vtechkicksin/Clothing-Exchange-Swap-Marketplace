const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SwapRequest = sequelize.define(
  "SwapRequest",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    sender_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },

    receiver_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },

    status: {
      type: DataTypes.ENUM(
        "PENDING",
        "ACCEPTED",
        "REJECTED",
        "CANCELLED",
        "COMPLETED"
      ),
      defaultValue: "PENDING",
      allowNull: false,
    },

    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },

    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    tableName: "swap_requests",
    timestamps: false,
  }
);

module.exports = SwapRequest;