"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("swap_transactions", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      swap_request_id: {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        references: {
          model: "swap_requests",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      status: {
        type: Sequelize.ENUM(
          "ACCEPTED",
          "IN_PROGRESS",
          "SHIPPED",
          "COMPLETED",
          "CANCELLED"
        ),
        allowNull: false,
        defaultValue: "ACCEPTED",
      },

      exchange_method: {
        type: Sequelize.ENUM(
          "LOCAL",
          "COURIER"
        ),
        allowNull: false,
      },

      accepted_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      completed_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("swap_transactions");
  },
};