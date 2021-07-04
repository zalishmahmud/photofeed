import React, { useState } from "react";
import "./Register.css";
import { useHistory } from "react-router-dom";
import Axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  let history = useHistory();
  const register = () => {
    console.log(username);
    Axios.post("http://localhost:3001/user/register", {
      username: username,
      email: email,
      password: password,
    }).then((response) => {
      console.log(response);
      history.push("/login");
    });
  };

  return (
    <div className="Register">
      <h1>Register</h1>
      <div className="RegisterForm">
        <input
          type="text"
          placeholder="Username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button onClick={register}>Register</button>
      </div>
    </div>
  );
}

export default Register;
