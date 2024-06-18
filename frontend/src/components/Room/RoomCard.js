import React from "react";

function RoomCard({ room }) {
  return (
    <div>
      <p>Room Number: {room.number}</p>
      <p>Type: {room.type}</p>
      {/* Additional room details here */}
    </div>
  );
}

export default RoomCard;
