"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("conversations", "swap_request_id", {
      type: Sequelize.UUID,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("conversations", "swap_request_id", {
      type: Sequelize.UUID,
      allowNull: false,
    });
  },
};
