const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const tokenFromCookie = req.cookies?.swapstyle_token;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : tokenFromCookie;

  if (!token) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return res.status(500).json({ message: "JWT secret is not configured" });
  }

  try {
    const payload = jwt.verify(token, secret);
    const user = await User.findByPk(payload.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.status !== "ACTIVE") {
      return res.status(403).json({ message: "User account is not active" });
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: insufficient role" });
    }

    next();
  };
};

module.exports = {
  authenticateJWT,
  authorizeRoles,
};
