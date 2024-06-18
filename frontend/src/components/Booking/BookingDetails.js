import React from "react";
import useRoomStore from "../../store/useRoomStore";

function BookingDetails({ bookingId }) {
  const booking = useRoomStore((state) => state.getBookingById(bookingId));

  return (
    <div>
      <h3>Booking Details</h3>
      <p>
        <strong>Room ID:</strong> {booking.roomId}
      </p>
      <p>
        <strong>Start Date:</strong> {booking.startDate}
      </p>
      <p>
        <strong>End Date:</strong> {booking.endDate}
      </p>
      <p>
        <strong>Status:</strong> {booking.status}
      </p>
    </div>
  );
}

export default BookingDetails;
