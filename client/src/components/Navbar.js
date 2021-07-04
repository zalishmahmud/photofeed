import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "./Navbar.css";

function Navbar({ setLoggedIn, loggedIn }) {
  let history = useHistory();
  useEffect(() => {
    setLoggedIn(localStorage.getItem("loggedIn"));
  }, []);

  const logout = () => {
    localStorage.clear();
    setLoggedIn(false);
    history.push("/");
  };

  return (
    <div className="Navbar">
      <a href="/">Home</a>

      {loggedIn ? (
        <>
          <a href="/profile">Profile</a>
          <a onClick={logout}>Logout</a>
        </>
      ) : (
        <>
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </>
      )}
    </div>
  );
}

export default Navbar;
