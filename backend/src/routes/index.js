const express = require("express");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const clothingListingRoutes = require("./clothingListingRoutes");
const messageRoutes = require("./messageRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/listings", clothingListingRoutes);
router.use("/messages", messageRoutes);
router.use("/", userRoutes);

module.exports = router;
