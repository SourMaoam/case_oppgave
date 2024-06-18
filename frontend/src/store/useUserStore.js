import create from "zustand";

const useUserStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,

  loginUser: async (login, password) => {
    try {
      const response = await fetch("http://localhost:5001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const user = await response.json();
      set({ user });
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", user.token);
      return true;
    } catch (error) {
      console.error("Failed to login:", error);
      return false;
    }
  },

  registerUser: async ({ username, email, password, role = "customer" }) => {
    try {
      const response = await fetch("http://localhost:5001/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, role }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const user = await response.json();
      set({ user });
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", user.token);
      return true;
    } catch (error) {
      console.error("Failed to register:", error);
      return false;
    }
  },

  fetchUserProfile: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5001/api/users/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const user = await response.json();
      set({ user });
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    }
  },

  logout: () => {
    set({ user: null });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  },
}));

export default useUserStore;
