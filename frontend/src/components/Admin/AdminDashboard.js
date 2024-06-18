import React, { useEffect, useState } from "react";
import useRoomStore from "../../store/useRoomStore";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const rooms = useRoomStore((state) => state.rooms);
  const fetchRooms = useRoomStore((state) => state.fetchRooms);
  const createRoom = useRoomStore((state) => state.createRoom);
  const updateRoom = useRoomStore((state) => state.updateRoom);
  const deleteRoom = useRoomStore((state) => state.deleteRoom);
  const bookRoomForUser = useRoomStore((state) => state.bookRoomForUser);

  const [newRoomNumber, setNewRoomNumber] = useState("");
  const [newRoomType, setNewRoomType] = useState("");
  const [editRoomNumber, setEditRoomNumber] = useState("");
  const [editRoomType, setEditRoomType] = useState("");
  const [editRoomId, setEditRoomId] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    try {
      await createRoom({ number: newRoomNumber, type: newRoomType });
      setNewRoomNumber("");
      setNewRoomType("");
      setMessage("Room created successfully");
    } catch (error) {
      setMessage("Failed to create room: " + error.message);
    }
  };

  const handleEditRoom = (room) => {
    setEditRoomId(room._id);
    setEditRoomNumber(room.number);
    setEditRoomType(room.type);
  };

  const handleUpdateRoom = async (e) => {
    e.preventDefault();
    try {
      await updateRoom(editRoomId, {
        number: editRoomNumber,
        type: editRoomType,
      });
      setEditRoomId(null);
      setEditRoomNumber("");
      setEditRoomType("");
      setMessage("Room updated successfully");
    } catch (error) {
      setMessage("Failed to update room: " + error.message);
    }
  };

  const handleDeleteRoom = async (roomId) => {
    try {
      await deleteRoom(roomId);
      setMessage("Room deleted successfully");
    } catch (error) {
      setMessage("Failed to delete room: " + error.message);
    }
  };

  const handleBookRoomForUser = async (e) => {
    e.preventDefault();
    try {
      await bookRoomForUser({
        email: userEmail,
        roomNumber,
        startDate,
        endDate,
      });
      setUserEmail("");
      setRoomNumber("");
      setStartDate("");
      setEndDate("");
      setMessage("Room booked successfully");
    } catch (error) {
      setMessage("Failed to book room for user: " + error.message);
    }
  };

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <h3>Rooms</h3>
      {message && <p>{message}</p>}
      <ul>
        {rooms.map((room) => (
          <li key={room._id}>
            Room {room.number} ({room.type}) -{" "}
            <Link to={`/rooms/${room._id}/history`}>View History</Link> -{" "}
            <button onClick={() => handleEditRoom(room)}>Edit</button> -{" "}
            <button onClick={() => handleDeleteRoom(room._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div className="form-container">
        <h3>Create Room</h3>
        <form onSubmit={handleCreateRoom}>
          <input
            type="text"
            placeholder="Room Number"
            value={newRoomNumber}
            onChange={(e) => setNewRoomNumber(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Room Type"
            value={newRoomType}
            onChange={(e) => setNewRoomType(e.target.value)}
            required
          />
          <button type="submit">Create Room</button>
        </form>
      </div>
      {editRoomId && (
        <div className="form-container">
          <h3>Edit Room</h3>
          <form onSubmit={handleUpdateRoom}>
            <input
              type="text"
              placeholder="Room Number"
              value={editRoomNumber}
              onChange={(e) => setEditRoomNumber(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Room Type"
              value={editRoomType}
              onChange={(e) => setEditRoomType(e.target.value)}
              required
            />
            <button type="submit">Update Room</button>
          </form>
        </div>
      )}
      <div className="form-container">
        <h3>Book Room for User</h3>
        <form onSubmit={handleBookRoomForUser}>
          <input
            type="email"
            placeholder="User Email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Room Number"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            required
          />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
          <button type="submit">Book Room</button>
        </form>
      </div>
    </div>
  );
}

export default AdminDashboard;
