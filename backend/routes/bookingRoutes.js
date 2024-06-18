// routes/bookingRoutes.js
const express = require("express");
const router = express.Router();
const {
  bookRoom,
  cancelBooking,
  getBookingDetails,
  getUserBookings,
  getAllBookings,
} = require("../controllers/bookingController");
const { protect, admin } = require("../middleware/authMiddleware");

router.post("/book", protect, bookRoom); // Book a room
router.patch("/:bookingId/cancel", protect, cancelBooking); // Cancel a booking
router.get("/:bookingId/details", protect, getBookingDetails); // Get booking details
router.get("/user", protect, getUserBookings); // Get user bookings
router.get("/all", protect, admin, getAllBookings); // Get all bookings for admin
router.delete("/:bookingId", protect, cancelBooking); // Delete a booking

module.exports = router;
