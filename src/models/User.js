const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },

    role: {
      type: DataTypes.ENUM("USER", "ADMIN"),
      defaultValue: "USER",
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("ACTIVE", "SUSPENDED", "DELETED"),
      defaultValue: "ACTIVE",
      allowNull: false,
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

module.exports = User;