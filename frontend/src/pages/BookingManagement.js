import React, { useEffect } from "react";
import useBookingStore from "../store/useBookingStore";
import useUserStore from "../store/useUserStore";

function BookingManagement() {
  const bookings = useBookingStore((state) => state.bookings);
  const fetchUserBookings = useBookingStore((state) => state.fetchUserBookings);
  const fetchAllBookings = useBookingStore((state) => state.fetchAllBookings);
  const deleteBooking = useBookingStore((state) => state.deleteBooking);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (user.role === "admin") {
      fetchAllBookings();
    } else {
      fetchUserBookings();
    }
  }, [fetchUserBookings, fetchAllBookings, user.role]);

  const handleDelete = async (bookingId) => {
    await deleteBooking(bookingId);
    if (user.role === "admin") {
      fetchAllBookings();
    } else {
      fetchUserBookings();
    }
  };
  if (!user) return null;


  return (
    <div>
      <h2>Booking Management</h2>
      {user && (
        <div>
          <h3>{user.role === "admin" ? "All Bookings" : "Your Bookings"}</h3>
          <ul>
            {bookings.map((booking) => (
              <li key={booking._id}>
                <p>Booking ID: {booking._id}</p>
                {user.role === "admin" && <p>User: {booking.user.username}</p>}
                {booking.room ? (
                  <>
                    <p>Room Number: {booking.room.number}</p>
                    <p>Room Type: {booking.room.type}</p>
                  </>
                ) : (
                  <p>Room information is not available</p>
                )}
                <p>
                  Start Date: {new Date(booking.startDate).toLocaleDateString()}
                </p>
                <p>
                  End Date: {new Date(booking.endDate).toLocaleDateString()}
                </p>
                <p>Status: {booking.status}</p>
                <button onClick={() => handleDelete(booking._id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default BookingManagement;
