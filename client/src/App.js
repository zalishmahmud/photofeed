import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
// import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <Navbar setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
      <Router>
        <Route path="/" exact component={() => <Home loggedIn={loggedIn} />} />
        <Route path="/register" exact render={() => <Register />} />
        <Route
          path="/login"
          exact
          component={() => (
            <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          )}
        />
      </Router>
    </>
  );
}

export default App;
