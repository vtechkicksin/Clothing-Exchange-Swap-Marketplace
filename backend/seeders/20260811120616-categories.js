"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("categories", [
      {
        id: "DRESS",
        name: "Dresses",
      },
      {
        id: "SHIRT",
        name: "Shirts",
      },
      {
        id: "JEANS",
        name: "Jeans",
      },
      {
        id: "JACKET",
        name: "Jackets",
      },
      {
        id: "SHOES",
        name: "Shoes",
      },
      {
        id: "BAG",
        name: "Bags",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", {
      id: {
        [Sequelize.Op.in]: [
          "DRESS",
          "SHIRT",
          "JEANS",
          "JACKET",
          "SHOES",
          "BAG",
        ],
      },
    });
  },
};