import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "@/services/users";
import { isAxiosError } from "axios";
import { STORAGE_KEY } from "@/constants/common";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await login(email, password);
      const { accessToken } = res.data;
      window.localStorage.setItem(STORAGE_KEY.TOKEN, accessToken);
      window.location.href = "/";
    } catch (err) {
      if (isAxiosError(err)) {
        alert(err.response?.data?.message || err.message || "login failed");
      } else {
        throw err;
      }
    }
  };

  return (
    <div>
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </div>
      <div>
        <button onClick={handleLogin}>login</button>
      </div>
      <div>
        Don't have an account?
        <Link to="/register"> Register</Link>!
      </div>
    </div>
  );
}
