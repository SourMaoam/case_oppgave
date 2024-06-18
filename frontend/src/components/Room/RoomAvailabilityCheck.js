import React, { useState } from "react";
import useRoomStore from "../../store/useRoomStore";

function RoomAvailabilityCheck() {
  const [roomNumber, setRoomNumber] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [availability, setAvailability] = useState(null);
  const checkRoomAvailability = useRoomStore(
    (state) => state.checkRoomAvailability
  );

  const handleCheckAvailability = async () => {
    const isAvailable = await checkRoomAvailability(
      roomNumber,
      startDate,
      endDate
    );
    setAvailability(isAvailable ? "Available" : "Not Available");
  };

  return (
    <div>
      <h2>Check Room Availability</h2>
      <div>
        <label>Room Number:</label>
        <input
          type="text"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
        />
      </div>
      <div>
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <button onClick={handleCheckAvailability}>Check Availability</button>
      {availability && <div>Room is {availability}</div>}
    </div>
  );
}

export default RoomAvailabilityCheck;
