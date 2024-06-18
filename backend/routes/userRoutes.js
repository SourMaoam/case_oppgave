const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// User registration
router.post("/register", registerUser);

// User login
router.post("/login", loginUser);

// Protected route to get user profile
router.get("/profile", protect, getUserProfile);

module.exports = router;
