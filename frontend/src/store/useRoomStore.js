import create from "zustand";
import { immer } from "zustand/middleware/immer";
import useUserStore from "./useUserStore";

const useRoomStore = create(
  immer((set, get) => ({
    rooms: [],
    roomHistory: [],
    bookings: [],
    fetchRooms: async () => {
      try {
        const response = await fetch("http://localhost:5001/api/rooms");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const rooms = await response.json();
        set((state) => {
          state.rooms = rooms;
        });
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
      }
    },
    fetchRoomHistory: async (roomId) => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:5001/api/rooms/${roomId}/history`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const history = await response.json();
        set((state) => {
          state.roomHistory = history;
        });
      } catch (error) {
        console.error("Failed to fetch room history:", error);
      }
    },
    createRoom: async (roomData) => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5001/api/rooms", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(roomData),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || `HTTP error! status: ${response.status}`
          );
        }
        const newRoom = await response.json();
        set((state) => {
          state.rooms.push(newRoom);
        });
      } catch (error) {
        console.error("Failed to create room:", error);
        throw error;
      }
    },
    updateRoom: async (roomId, roomData) => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:5001/api/rooms/${roomId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(roomData),
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || `HTTP error! status: ${response.status}`
          );
        }
        const updatedRoom = await response.json();
        set((state) => {
          const index = state.rooms.findIndex((room) => room._id === roomId);
          if (index !== -1) {
            state.rooms[index] = updatedRoom;
          }
        });
      } catch (error) {
        console.error("Failed to update room:", error);
        throw error;
      }
    },
    deleteRoom: async (roomId) => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:5001/api/rooms/${roomId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || `HTTP error! status: ${response.status}`
          );
        }
        set((state) => {
          state.rooms = state.rooms.filter((room) => room._id !== roomId);
        });
      } catch (error) {
        console.error("Failed to delete room:", error);
        throw error;
      }
    },
    bookRoom: async ({ roomNumber, startDate, endDate }) => {
      try {
        const token = localStorage.getItem("token");
        const user = useUserStore.getState().user;
        if (!user) {
          throw new Error("User not logged in");
        }
        const userId = user._id;

        const response = await fetch(
          "http://localhost:5001/api/bookings/book",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ userId, roomNumber, startDate, endDate }),
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || `HTTP error! status: ${response.status}`
          );
        }
        const booking = await response.json();
        set((state) => {
          state.bookings.push(booking);
        });
      } catch (error) {
        console.error("Failed to book room:", error);
        throw error;
      }
    },
    bookRoomForUser: async ({ email, roomNumber, startDate, endDate }) => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:5001/api/rooms/book-for-user",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ email, roomNumber, startDate, endDate }),
          }
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || `HTTP error! status: ${response.status}`
          );
        }
        const booking = await response.json();
        set((state) => {
          state.bookings.push(booking);
        });
      } catch (error) {
        console.error("Failed to book room for user:", error);
        throw error;
      }
    },
    checkRoomAvailability: async (roomNumber, startDate, endDate) => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/rooms/${roomNumber}/availability?startDate=${startDate}&endDate=${endDate}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.available;
      } catch (error) {
        console.error("Failed to check room availability:", error);
        return false;
      }
    },
    getRoomHistory: async (roomId) => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:5001/api/rooms/${roomId}/history`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const history = await response.json();
        return history;
      } catch (error) {
        console.error("Failed to get room history:", error);
        return [];
      }
    },
  }))
);

export default useRoomStore;
