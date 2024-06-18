import React, { useState } from "react";
import useUserStore from "../../store/useUserStore";
import "../../styles/modal.css";

function Modal({ onClose }) {
  const loginUser = useUserStore((state) => state.loginUser);
  const registerUser = useUserStore((state) => state.registerUser);
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await loginUser(username, password);
    if (success) {
      onClose();
    } else {
      alert("Login failed");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const success = await registerUser({ username, email, password });
    if (success) {
      onClose();
    } else {
      alert("Registration failed");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        {isRegister ? (
          <form onSubmit={handleRegister}>
            <h2>Register</h2>
            <div>
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Register</button>
            <p>
              Already have an account?{" "}
              <button type="button" onClick={() => setIsRegister(false)}>
                Login here
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <div>
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Login</button>
            <p>
              Don't have an account?{" "}
              <button type="button" onClick={() => setIsRegister(true)}>
                Register here
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default Modal;
