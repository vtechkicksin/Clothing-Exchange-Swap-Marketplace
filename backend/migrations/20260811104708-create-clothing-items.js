"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("clothing_items", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      owner_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      category_id: {
      type: Sequelize.STRING(20),
      allowNull: false,
      references: {
        model: "categories",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },

      title: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },

      brand: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },

      size: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },

      condition: {
        type: Sequelize.ENUM(
          "NEW",
          "LIKE_NEW",
          "GOOD",
          "FAIR"
        ),
        allowNull: false,
      },

      color: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },

      material: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      estimated_swap_value: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },

      city: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },

      latitude: {
        type: Sequelize.DECIMAL(10, 8),
        allowNull: true,
      },

      longitude: {
        type: Sequelize.DECIMAL(11, 8),
        allowNull: true,
      },

      status: {
        type: Sequelize.ENUM(
          "AVAILABLE",
          "RESERVED",
          "SWAPPED",
          "REMOVED"
        ),
        allowNull: false,
        defaultValue: "AVAILABLE",
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("clothing_items");
  },
};