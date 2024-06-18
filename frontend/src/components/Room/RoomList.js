import React, { useEffect } from 'react';
import useRoomStore from '../../store/useRoomStore';

function RoomList() {
  const rooms = useRoomStore((state) => state.rooms);
  const fetchRooms = useRoomStore((state) => state.fetchRooms);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  return (
    <div>
      <h2>Room List</h2>
      {rooms.map((room) => (
        <div key={room._id}>
          {room.number} - {room.type}
        </div>
      ))}
    </div>
  );
}

export default RoomList;
