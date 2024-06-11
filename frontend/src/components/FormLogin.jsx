import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import LoadingIndicator from "./LoadingIndicator";

function FormLogin({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{name}</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          className="form-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          className="form-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {loading && <LoadingIndicator />}
        <button className="form-button" type="submit">
          {name}
        </button>
      </form>
      <div className="mt-4 text-center">
        <p>or login with</p>
        <div className="flex justify-center space-x-4 mt-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
            Login with Facebook
          </button>
          <button className="px-4 py-2 bg-black text-white rounded-md">
            Login with X
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-md">
            Login with Google
          </button>
          <button className="px-4 py-2 bg-black text-white rounded-md">
            Login with Apple
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormLogin;
