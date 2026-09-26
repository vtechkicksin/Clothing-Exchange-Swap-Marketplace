"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("conversations", "user_one_id", {
      type: Sequelize.UUID,
      allowNull: true,
    });
    await queryInterface.addColumn("conversations", "user_two_id", {
      type: Sequelize.UUID,
      allowNull: true,
    });
    await queryInterface.changeColumn("conversations", "swap_request_id", {
      type: Sequelize.UUID,
      allowNull: true,
      references: { model: "swap_requests", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    await queryInterface.addConstraint("conversations", {
      fields: ["user_one_id"],
      type: "foreign key",
      name: "conversations_user_one_id_fk",
      references: { table: "users", field: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    await queryInterface.addConstraint("conversations", {
      fields: ["user_two_id"],
      type: "foreign key",
      name: "conversations_user_two_id_fk",
      references: { table: "users", field: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    await queryInterface.addIndex(
      "conversations",
      ["user_one_id", "user_two_id"],
      {
        unique: true,
        name: "conversations_user_pair_unique",
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      "DELETE FROM conversations WHERE swap_request_id IS NULL",
    );
    await queryInterface.removeIndex(
      "conversations",
      "conversations_user_pair_unique",
    );
    await queryInterface.removeConstraint(
      "conversations",
      "conversations_user_one_id_fk",
    );
    await queryInterface.removeConstraint(
      "conversations",
      "conversations_user_two_id_fk",
    );
    await queryInterface.removeColumn("conversations", "user_one_id");
    await queryInterface.removeColumn("conversations", "user_two_id");
    await queryInterface.changeColumn("conversations", "swap_request_id", {
      type: Sequelize.UUID,
      allowNull: false,
      references: { model: "swap_requests", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },
};
