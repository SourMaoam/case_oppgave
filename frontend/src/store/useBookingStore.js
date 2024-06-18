// store/useBookingStore.js
import create from "zustand";

const useBookingStore = create((set) => ({
  bookings: [],
  fetchUserBookings: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5001/api/bookings/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      set({ bookings: data });
    } catch (error) {
      console.error("Failed to fetch user bookings:", error);
    }
  },
  fetchAllBookings: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5001/api/bookings/all", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      set({ bookings: data });
    } catch (error) {
      console.error("Failed to fetch all bookings:", error);
    }
  },
  deleteBooking: async (bookingId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5001/api/bookings/${bookingId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      set((state) => ({
        bookings: state.bookings.filter((booking) => booking._id !== bookingId),
      }));
    } catch (error) {
      console.error("Failed to delete booking:", error);
    }
  },
}));

export default useBookingStore;
