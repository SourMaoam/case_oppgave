const Room = require("../models/Room");
const User = require("../models/User");

exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.checkRoomAvailability = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const room = await Room.findOne({ number: req.params.roomNumber });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    const isAvailable = room.bookings.every((booking) => {
      return (
        new Date(endDate) <= new Date(booking.startDate) ||
        new Date(startDate) >= new Date(booking.endDate) ||
        booking.status === "cancelled"
      );
    });

    res.status(200).json({ available: isAvailable });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.bookRoom = async (req, res) => {
  const { roomNumber, startDate, endDate } = req.body;
  const userId = req.user._id;
  try {
    const room = await Room.findOne({ number: roomNumber });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const overlap = room.bookings.some((booking) => {
      return (
        new Date(startDate) < new Date(booking.endDate) &&
        new Date(endDate) > new Date(booking.startDate) &&
        booking.status === "active"
      );
    });

    if (overlap) {
      return res
        .status(400)
        .json({ message: "Room already booked for the given dates" });
    }

    room.bookings.push({ user: userId, startDate, endDate });
    await room.save();
    res.status(201).json({
      message: "Room booked successfully",
      booking: room.bookings.slice(-1)[0],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.bookRoomForUser = async (req, res) => {
  const { email, roomNumber, startDate, endDate } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const room = await Room.findOne({ number: roomNumber });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const overlap = room.bookings.some((booking) => {
      return (
        new Date(startDate) < new Date(booking.endDate) &&
        new Date(endDate) > new Date(booking.startDate) &&
        booking.status === "active"
      );
    });

    if (overlap) {
      return res
        .status(400)
        .json({ message: "Room already booked for the given dates" });
    }

    room.bookings.push({ user: user._id, startDate, endDate });
    await room.save();
    res.status(201).json({
      message: "Room booked successfully for user",
      booking: room.bookings.slice(-1)[0],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRoomHistory = async (req, res) => {
  try {
    const room = await Room.findById(req.params.roomId).populate(
      "bookings.user"
    );
    res.status(200).json(room.bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  const { roomId, bookingId } = req.params;
  const userId = req.user._id; // Get user id from request user object
  try {
    const room = await Room.findById(roomId);
    const booking = room.bookings.id(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Check if the booking is for the user or if the user is an admin
    if (booking.user.equals(userId) || req.user.role === "admin") {
      booking.status = "cancelled";
      await room.save();
      res.status(200).json({ message: "Booking cancelled successfully" });
    } else {
      res
        .status(401)
        .json({ message: "Not authorized to cancel this booking" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateRoom = async (req, res) => {
  try {
    const { number, type } = req.body;
    const room = await Room.findByIdAndUpdate(
      req.params.roomId,
      { number, type },
      { new: true }
    );
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createRoom = async (req, res) => {
  const { number, type } = req.body;
  try {
    const existingRoom = await Room.findOne({ number });
    if (existingRoom) {
      return res.status(400).json({ message: "Room already exists" });
    }

    const newRoom = new Room({
      number,
      type,
    });

    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
