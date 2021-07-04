import React, { useState } from "react";
import Axios from "axios";
import "./Login.css";

import { useHistory } from "react-router-dom";

function Login({ setLoggedIn, loggedIn }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  let history = useHistory();
  const login = () => {
    console.log(email);
    Axios.post("http://localhost:3001/user/login", {
      email: email,
      password: password,
    }).then((response) => {
      if (response.data.loggedIn) {
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("username", response.data.username);
        setLoggedIn(true);
        history.push("/");
      } else {
        setErrorMsg(response.data.message);
      }
    });
  };

  if (loggedIn) {
    history.push("/");
  }

  return (
    <div className="Login">
      <h1>Login</h1>
      <div className="LoginForm">
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
        <button onClick={login}>Login</button>
        <h3 style={{ color: "red" }}>{errorMsg}</h3>
      </div>
    </div>
  );
}

export default Login;
