const express = require("express");
const router = express.Router();
const {
  checkRoomAvailability,
  bookRoom,
  bookRoomForUser,
  getRoomHistory,
  cancelBooking,
  updateRoom,
  getAllRooms,
  createRoom,
  deleteRoom,
} = require("../controllers/roomController");
const { protect, admin } = require("../middleware/authMiddleware");

// Fetch all rooms
router.get("/", getAllRooms);

// Check room availability
router.get("/:roomNumber/availability", checkRoomAvailability);

// Book a room using room number
router.post("/book", protect, bookRoom);

// Book a room for a user
router.post("/book-for-user", protect, admin, bookRoomForUser);

// Get room history, only accessible by admins
router.get("/:roomId/history", protect, admin, getRoomHistory);

// Cancel a booking, accessible to the user who made the booking or admins
router.patch("/:roomId/cancelBooking/:bookingId", protect, cancelBooking);

// Update room details, only accessible by admins
router.put("/:roomId", protect, admin, updateRoom);

// Create a new room, only accessible by admins
router.post("/", protect, admin, createRoom);

// Delete a room, only accessible by admins
router.delete("/:roomId", protect, admin, deleteRoom);

module.exports = router;
