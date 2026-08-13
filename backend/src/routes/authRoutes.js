const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { authenticateJWT } = require("../middleware/authMiddleware");

const router = express.Router();

class AuthController {
  static setAuthCookie(res, token) {
    res.cookie("swapstyle_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
      path: "/",
    });
  }

  static async getCurrentUser(req, res) {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      return res.json({
        user: {
          id: req.user.id,
          name: req.user.name,
          email: req.user.email,
          role: req.user.role,
        },
      });
    } catch (error) {
      return res.status(500).json({ message: "Could not load session" });
    }
  }

  static async logout(req, res) {
    try {
      res.clearCookie("swapstyle_token", { path: "/" });
      return res.json({ message: "Logged out successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Logout failed" });
    }
  }

  static generateToken(user) {
    return jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" },
    );
  }

  static async register(req, res) {
    try {
      const { name, email, password, phone } = req.body;

      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ message: "Name, email, and password are required" });
      }

      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ message: "Email already in use" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        phone,
        role: "USER",
      });

      const token = AuthController.generateToken(user);
      AuthController.setAuthCookie(res, token);

      return res.status(201).json({
        message: "User registered successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Registration failed" });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      if (user.status !== "ACTIVE") {
        return res.status(403).json({ message: "Account is not active" });
      }

      const token = AuthController.generateToken(user);
      AuthController.setAuthCookie(res, token);

      return res.json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Login failed" });
    }
  }
}

router.get("/me", authenticateJWT, AuthController.getCurrentUser);
router.post("/logout", AuthController.logout);
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

module.exports = router;
