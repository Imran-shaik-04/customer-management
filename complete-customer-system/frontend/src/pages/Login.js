import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
	  
   // try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password
      }, { withCredentials: true });
      alert("Login successful");
      navigate("/dashboard");
   // } catch (err) {
    //  alert("Login failed");
   // }
  };

  return (
    <div>
      <h2>Staff Login</h2>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;