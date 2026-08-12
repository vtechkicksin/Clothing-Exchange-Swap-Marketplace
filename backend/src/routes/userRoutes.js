const express = require("express");
const User = require("../models/User");
const {
  authenticateJWT,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();

class UserController {
  static async getProfile(req, res) {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: [
          "id",
          "name",
          "email",
          "phone",
          "role",
          "status",
          "created_at",
        ],
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to fetch profile" });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await User.findAll({
        attributes: [
          "id",
          "name",
          "email",
          "phone",
          "role",
          "status",
          "created_at",
        ],
      });

      return res.json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to fetch users" });
    }
  }
}

router.get("/profile", authenticateJWT, UserController.getProfile);
router.get(
  "/admin/users",
  authenticateJWT,
  authorizeRoles("ADMIN"),
  UserController.getAllUsers,
);

module.exports = router;
