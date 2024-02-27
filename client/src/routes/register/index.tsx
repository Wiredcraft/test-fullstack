import { useState } from "react";
import { Link } from "react-router-dom";
import { isAxiosError } from "axios";
import { register } from "@/services/users";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await register(name, email, password);
      alert("register success, please login");
      window.location.href = "/login";
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
          type="username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="User Name"
        />
      </div>
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
        <button onClick={handleRegister}>register</button>
      </div>
      <div>
        Already have an account?
        <Link to="/login"> Login</Link>!
      </div>
    </div>
  );
}
