"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("profiles", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      profile_image: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },

      bio: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      city: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },

      state: {
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("profiles");
  },
};