import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useRoomStore from "../../store/useRoomStore";

function RoomHistory() {
  const { roomId } = useParams();
  const getRoomHistory = useRoomStore((state) => state.getRoomHistory);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const roomHistory = await getRoomHistory(roomId);
      setHistory(roomHistory);
    };

    fetchHistory();
  }, [roomId, getRoomHistory]);

  return (
    <div>
      <h2>Room History</h2>
      {history.length > 0 ? (
        <ul>
          {history.map((booking) => (
            <li key={booking._id}>
              <p>Booking ID: {booking._id}</p>
              <p>User: {booking.user.username}</p>
              <p>
                Start Date: {new Date(booking.startDate).toLocaleDateString()}
              </p>
              <p>End Date: {new Date(booking.endDate).toLocaleDateString()}</p>
              <p>Status: {booking.status}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No booking history available.</p>
      )}
    </div>
  );
}

export default RoomHistory;
