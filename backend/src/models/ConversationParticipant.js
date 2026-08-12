const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ConversationParticipant = sequelize.define(
  "ConversationParticipant",
  {
    conversation_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "conversations",
        key: "id",
      },
    },

    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    tableName: "conversation_participants",
    timestamps: false,
  }
);

module.exports = ConversationParticipant;