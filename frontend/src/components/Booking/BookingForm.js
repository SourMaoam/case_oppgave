import React, { useState } from "react";
import useRoomStore from "../../store/useRoomStore";

function BookingForm({ roomNumber }) {
  const bookRoom = useRoomStore((state) => state.bookRoom);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await bookRoom({ roomNumber, startDate, endDate });
      alert("Room booked successfully");
    } catch (error) {
      alert("Failed to book room: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Start Date:</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        required
      />
      <label>End Date:</label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        required
      />
      <button type="submit">Book Room</button>
    </form>
  );
}

export default BookingForm;
