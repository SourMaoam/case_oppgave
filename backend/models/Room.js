const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: {
    type: String,
    required: true,
    enum: ["active", "cancelled"],
    default: "active",
  },
  createdAt: { type: Date, default: Date.now },
});

const roomSchema = mongoose.Schema(
  {
    number: { type: Number, required: true, unique: true },
    type: { type: String, required: true, enum: ["single", "double", "suite"] },
    bookings: [bookingSchema],
    damages: [
      { description: String, reportedAt: { type: Date, default: Date.now } },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Room", roomSchema);
