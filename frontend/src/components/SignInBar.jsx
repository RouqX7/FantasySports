import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import LoadingIndicator from "./LoadingIndicator";

function SignInBar( route, method) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post("/login", { username, password });
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      navigate("/");
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-4 mb-4">
          <input
            className="p-2 rounded-md border border-gray-300"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Email"
          />
          <input
            className="p-2 rounded-md border border-gray-300"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Sign In
          </button>
        </div>
        {loading && <LoadingIndicator />}
      </form>
      <div className="flex justify-between items-center mt-4">
        <a href="#" className="text-blue-500">
          Forgot your password?
        </a>
      </div>
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

export default SignInBar;
