import React, { useState } from "react";
import useRoomStore from "../../store/useRoomStore";

function AddRoomForm() {
  const [roomNumber, setRoomNumber] = useState("");
  const [roomType, setRoomType] = useState("");
  const addRoom = useRoomStore((state) => state.addRoom);

  const handleSubmit = (event) => {
    event.preventDefault();
    addRoom({ id: Date.now(), number: roomNumber, type: roomType });
    setRoomNumber("");
    setRoomType("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={roomNumber}
        onChange={(e) => setRoomNumber(e.target.value)}
        placeholder="Room Number"
      />
      <input
        type="text"
        value={roomType}
        onChange={(e) => setRoomType(e.target.value)}
        placeholder="Room Type"
      />
      <button type="submit">Add Room</button>
    </form>
  );
}

export default AddRoomForm;
