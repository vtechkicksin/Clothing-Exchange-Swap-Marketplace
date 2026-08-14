const express = require("express");
const ClothingItem = require("../models/ClothingItem");
const ClothingImage = require("../models/ClothingImage");
const User = require("../models/User");
const Category = require("../models/Category");
const { authenticateJWT } = require("../middleware/authMiddleware");

const router = express.Router();

class ClothingListingController {
  /**
   * Fetch all clothing items with their associated images
   * Response format: Array of clothing items with nested images array
   */
  static async getAllClothingItems(req, res) {
    try {
        console.log("Fetching all clothing items...");
      const clothingItems = await ClothingItem.findAll({
        where: { status: "AVAILABLE" },
        include: [
          {
            model: User,
            attributes: ["id", "name", "email"],
            as: "owner",
          },
          {
            model: Category,
            attributes: ["id", "name"],
            as: "category",
          },
        ],
        order: [["created_at", "DESC"]],
      });

      // Fetch images for each clothing item
      const clothingItemsWithImages = await Promise.all(
        clothingItems.map(async (item) => {
          const images = await ClothingImage.findAll({
            where: { clothing_item_id: item.id },
            order: [["display_order", "ASC"]],
            attributes: ["id", "image_url", "is_primary", "display_order"],
          });

          return {
            id: item.id,
            title: item.title,
            brand: item.brand,
            size: item.size,
            condition: item.condition,
            description: item.description,
            estimated_swap_value: item.estimated_swap_value,
            city: item.city,
            status: item.status,
            category_id: item.category_id,
            owner_id: item.owner_id,
            created_at: item.created_at,
            updated_at: item.updated_at,
            owner: item.owner,
            category: item.category,
            images: images.map((image) => ({
              id: image.id,
              image_url: image.image_url,
              is_primary: image.is_primary,
              display_order: image.display_order,
            })),
          };
        }),
      );

      return res.json({
        message: "Clothing items fetched successfully",
        total: clothingItemsWithImages.length,
        data: clothingItemsWithImages,
      });
    } catch (error) {
      console.error("Fetch clothing items error:", error);
      return res.status(500).json({
        message: "Failed to fetch clothing items",
        error: error.message,
      });
    }
  }

  /**
   * Fetch a single clothing item by ID with all its images
   */
  static async getClothingItemById(req, res) {
    try {
      const { id } = req.params;

      const clothingItem = await ClothingItem.findByPk(id, {
        include: [
          {
            model: User,
            attributes: ["id", "name", "email"],
            as: "owner",
          },
          {
            model: Category,
            attributes: ["id", "name"],
            as: "category",
          },
        ],
      });

      if (!clothingItem) {
        return res.status(404).json({ message: "Clothing item not found" });
      }

      const images = await ClothingImage.findAll({
        where: { clothing_item_id: id },
        order: [["display_order", "ASC"]],
        attributes: ["id", "image_url", "is_primary", "display_order"],
      });

      const response = {
        id: clothingItem.id,
        title: clothingItem.title,
        brand: clothingItem.brand,
        size: clothingItem.size,
        condition: clothingItem.condition,
        description: clothingItem.description,
        estimated_swap_value: clothingItem.estimated_swap_value,
        city: clothingItem.city,
        status: clothingItem.status,
        category_id: clothingItem.category_id,
        owner_id: clothingItem.owner_id,
        created_at: clothingItem.created_at,
        updated_at: clothingItem.updated_at,
        owner: clothingItem.owner,
        category: clothingItem.category,
        images: images.map((image) => ({
          id: image.id,
          image_url: image.image_url,
          is_primary: image.is_primary,
          display_order: image.display_order,
        })),
      };

      return res.json({
        message: "Clothing item fetched successfully",
        data: response,
      });
    } catch (error) {
      console.error("Fetch clothing item error:", error);
      return res.status(500).json({
        message: "Failed to fetch clothing item",
        error: error.message,
      });
    }
  }

  /**
   * Fetch clothing items by user/owner ID
   */
  static async getClothingItemsByUserId(req, res) {
    try {
      const { userId } = req.params;

      const clothingItems = await ClothingItem.findAll({
        where: { owner_id: userId },
        include: [
          {
            model: User,
            attributes: ["id", "name", "email"],
            as: "owner",
          },
          {
            model: Category,
            attributes: ["id", "name"],
            as: "category",
          },
        ],
        order: [["created_at", "DESC"]],
      });

      const clothingItemsWithImages = await Promise.all(
        clothingItems.map(async (item) => {
          const images = await ClothingImage.findAll({
            where: { clothing_item_id: item.id },
            order: [["display_order", "ASC"]],
            attributes: ["id", "image_url", "is_primary", "display_order"],
          });

          return {
            id: item.id,
            title: item.title,
            brand: item.brand,
            size: item.size,
            condition: item.condition,
            description: item.description,
            estimated_swap_value: item.estimated_swap_value,
            city: item.city,
            status: item.status,
            category_id: item.category_id,
            owner_id: item.owner_id,
            created_at: item.created_at,
            updated_at: item.updated_at,
            owner: item.owner,
            category: item.category,
            images: images.map((image) => ({
              id: image.id,
              image_url: image.image_url,
              is_primary: image.is_primary,
              display_order: image.display_order,
            })),
          };
        }),
      );

      return res.json({
        message: "User clothing items fetched successfully",
        total: clothingItemsWithImages.length,
        data: clothingItemsWithImages,
      });
    } catch (error) {
      console.error("Fetch user clothing items error:", error);
      return res.status(500).json({
        message: "Failed to fetch user clothing items",
        error: error.message,
      });
    }
  }
}

// Routes
router.get("/", ClothingListingController.getAllClothingItems);

router.get("/:id", ClothingListingController.getClothingItemById);

router.get("/user/:userId", ClothingListingController.getClothingItemsByUserId);

module.exports = router;
