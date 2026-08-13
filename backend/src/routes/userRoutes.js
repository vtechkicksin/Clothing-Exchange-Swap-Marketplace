const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const User = require("../models/User");
const ClothingItem = require("../models/ClothingItem");
const ClothingImage = require("../models/ClothingImage");
const {
  authenticateJWT,
  authorizeRoles,
} = require("../middleware/authMiddleware");

const router = express.Router();
const UPLOADS_DIRECTORY = path.join(__dirname, "../../uploads");

if (!fs.existsSync(UPLOADS_DIRECTORY)) {
  fs.mkdirSync(UPLOADS_DIRECTORY, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIRECTORY);
  },
  filename: (req, file, cb) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const sanitizedName = (file.originalname || "image")
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9._-]/g, "_");

    cb(null, `${timestamp}-${sanitizedName}`);
  },
});

const upload = multer({
  storage,
  limits: {
    files: 6,
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed."));
    }
    cb(null, true);
  },
});

class UserController {
  static extractFiles(req) {
    return [...(req.files?.images || []), ...(req.files?.selectedImages || [])];
  }

  static normalizeCondition(condition) {
    const value = String(condition || "").trim();

    const conditionMap = {
      NEW: "NEW",
      "LIKE NEW": "LIKE_NEW",
      LIKE_NEW: "LIKE_NEW",
      GOOD: "GOOD",
      FAIR: "FAIR",
    };

    return conditionMap[value.toUpperCase()] || "NEW";
  }

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

  static async createClothingItem(req, res) {
    try {
      const files = UserController.extractFiles(req);

      if (!files.length) {
        return res.status(400).json({
          message: "At least one image is required.",
        });
      }

      const {
        availableForSwap,
        brand,
        category,
        condition,
        description,
        estimatedValue,
        itemName,
        location,
        size,
      } = req.body;

      const normalizedCategory = String(category || "")
        .trim()
        .toUpperCase();

      if (!normalizedCategory || !itemName) {
        return res.status(400).json({
          message: "Category and item name are required.",
        });
      }

      const clothingItem = await ClothingItem.create({
        owner_id: req.user.id,
        category_id: normalizedCategory,
        title: itemName,
        brand: brand || null,
        size: size || null,
        condition: UserController.normalizeCondition(condition),
        description: description || null,
        estimated_swap_value: estimatedValue ? Number(estimatedValue) : null,
        city: location || null,
        status:
          availableForSwap === "false" || availableForSwap === false
            ? "REMOVED"
            : "AVAILABLE",
      });

      const imageRecords = await Promise.all(
        files.map(async (file, index) => {
          const relativeUrl = `/uploads/${path.basename(file.filename)}`;

          return ClothingImage.create({
            clothing_item_id: clothingItem.id,
            image_url: relativeUrl,
            is_primary: index === 0,
            display_order: index,
          });
        }),
      );

      return res.status(201).json({
        message: "Clothing item created successfully",
        item: clothingItem,
        images: imageRecords,
      });
    } catch (error) {
      console.error("Create clothing item error:", error);
      return res.status(500).json({
        message: "Failed to create clothing item",
        error: error.message,
      });
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
router.post(
  "/items",
  authenticateJWT,
  upload.fields([
    { name: "images", maxCount: 6 },
    { name: "selectedImages", maxCount: 6 },
  ]),
  UserController.createClothingItem,
);

module.exports = router;
