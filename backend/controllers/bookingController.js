const Booking = require("../models/Booking");
const Room = require("../models/Room");

exports.bookRoom = async (req, res) => {
  const { userId, roomNumber, startDate, endDate } = req.body;

  try {
    const room = await Room.findOne({ number: roomNumber });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const existingBooking = await Booking.find({
      room: room._id,
      endDate: { $gte: startDate },
      startDate: { $lte: endDate },
      status: "booked",
    });

    if (existingBooking.length > 0) {
      return res
        .status(400)
        .json({ message: "Room is not available for the selected dates" });
    }

    const booking = new Booking({
      user: userId,
      room: room._id,
      startDate,
      endDate,
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = "cancelled";
    await booking.save();

    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBookingDetails = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await Booking.findById(bookingId)
      .populate("user")
      .populate("room");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    console.log("Fetching bookings for user:", req.user._id);
    const bookings = await Booking.find({ user: req.user._id }).populate(
      "room"
    );
    console.log("Bookings found:", bookings);
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    console.log("Fetching all bookings");
    const bookings = await Booking.find().populate("user").populate("room");
    console.log("All bookings found:", bookings);
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    res.status(500).json({ message: error.message });
  }
};
