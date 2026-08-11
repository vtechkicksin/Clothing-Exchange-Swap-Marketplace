"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("swap_request_items", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      swap_request_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "swap_requests",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      clothing_item_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "clothing_items",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      role: {
        type: Sequelize.ENUM(
          "OFFERED",
          "REQUESTED"
        ),
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("swap_request_items");
  },
};