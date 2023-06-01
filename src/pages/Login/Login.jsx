import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loggedUserData from "../../services/LoggedUserData";
import axios from "axios";
import Swal from "sweetalert2";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const TOKEN_URL = "http://127.0.0.1:8000/user/token/";

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        TOKEN_URL,
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;

      if (response.status === 200) {
        localStorage.setItem("authTokens", JSON.stringify(data));
        const userData = await loggedUserData(data.user_id);
        localStorage.setItem("userData", JSON.stringify(userData));
        window.location.href="/";
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid email or password!",
      });
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full max-w-xs">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username:
              <input
                type="string"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Contraseña:
              <input
                type="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyUp={handleKeyPress}
              />
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
            <Link to="/register" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
            Are you register?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;