import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useUserStore from "../../store/useUserStore";

function LoginForm() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const loginUser = useUserStore((state) => state.loginUser);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await loginUser(login, password);
    if (success) {
      navigate("/dashboard");
    } else {
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label>Login (Email/Username):</label>
        <input
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
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
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </form>
  );
}

export default LoginForm;
