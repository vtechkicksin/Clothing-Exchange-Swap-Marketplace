const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Conversation = sequelize.define(
  "Conversation",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    swap_request_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "swap_requests",
        key: "id",
      },
    },

    user_one_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: "users", key: "id" },
    },

    user_two_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: "users", key: "id" },
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
    tableName: "conversations",
    timestamps: false,
  },
);

module.exports = Conversation;
