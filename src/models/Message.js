const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Message = sequelize.define(
  "Message",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    conversation_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "conversations",
        key: "id",
      },
    },

    sender_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },

    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    message_type: {
      type: DataTypes.ENUM(
        "TEXT",
        "IMAGE",
        "FILE"
      ),
      defaultValue: "TEXT",
      allowNull: false,
    },

    attachment_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },

    is_read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    tableName: "messages",
    timestamps: false,
  }
);

module.exports = Message;