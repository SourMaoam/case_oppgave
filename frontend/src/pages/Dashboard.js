import React, { useEffect, useState } from "react";
import useRoomStore from "../store/useRoomStore";
import useUserStore from "../store/useUserStore";
import BookingForm from "../components/Booking/BookingForm";
import Modal from "../components/modals/LoginModal";
import "../styles/Dashboard.css";

function Dashboard() {
  const rooms = useRoomStore((state) => state.rooms);
  const fetchRooms = useRoomStore((state) => state.fetchRooms);
  const checkRoomAvailability = useRoomStore(
    (state) => state.checkRoomAvailability
  );
  const bookRoom = useRoomStore((state) => state.bookRoom);
  const user = useUserStore((state) => state.user);

  const [sortedRooms, setSortedRooms] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [roomType, setRoomType] = useState("");
  const [roomNumberSearch, setRoomNumberSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  useEffect(() => {
    setSortedRooms(rooms);
  }, [rooms]);

  const handleRoomTypeChange = (e) => {
    setRoomType(e.target.value);
  };

  const handleFilter = async () => {
    let filteredRooms = rooms;

    if (roomType) {
      filteredRooms = filteredRooms.filter((room) => room.type === roomType);
    }

    if (startDate && endDate) {
      const availableRooms = [];
      for (let room of filteredRooms) {
        const isAvailable = await checkRoomAvailability(
          room.number,
          startDate,
          endDate
        );
        if (isAvailable) {
          availableRooms.push(room);
        }
      }
      setSortedRooms(availableRooms);
    } else {
      setSortedRooms(filteredRooms);
    }
  };

  const handleSearch = () => {
    if (roomNumberSearch) {
      const searchedRoom = rooms.filter(
        (room) => room.number === parseInt(roomNumberSearch, 10)
      );
      setSortedRooms(searchedRoom);
    } else {
      setSortedRooms(rooms);
    }
  };

  const handleBooking = async (roomNumber) => {
    if (!user) {
      setShowModal(true);
    } else {
      try {
        await bookRoom({ roomNumber, startDate, endDate });
        alert("Room booked successfully");
      } catch (error) {
        alert("Failed to book room: " + error.message);
      }
    }
  };

  return (
    <div className="container">
      <h2 className="dashboard-title">Rooms Dashboard</h2>
      <div className="filter-container">
        <label className="filter-label">Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="filter-input"
        />
        <label className="filter-label">End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="filter-input"
        />
        <label className="filter-label">Room Type:</label>
        <select
          value={roomType}
          onChange={handleRoomTypeChange}
          className="filter-select"
        >
          <option value="">All</option>
          <option value="single">Single</option>
          <option value="double">Double</option>
          <option value="suite">Suite</option>
        </select>
        <button onClick={handleFilter} className="filter-button">
          Check Availability
        </button>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Room Number"
          value={roomNumberSearch}
          onChange={(e) => setRoomNumberSearch(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
      <div className="room-list">
        {sortedRooms.map((room) => (
          <div key={room._id} className="room-item">
            <h3 className="room-title">
              Room {room.number} ({room.type})
            </h3>
            {user ? (
              <BookingForm roomNumber={room.number} />
            ) : (
              <button
                onClick={() => handleBooking(room.number)}
                className="filter-button"
              >
                Book Room
              </button>
            )}
          </div>
        ))}
      </div>
      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default Dashboard;
