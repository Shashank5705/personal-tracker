import React from "react";
import "./header.css";
import { Link } from "react-router-dom";

import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="header">
      <div className="header-container">
        <Link className="header-title" to="/">
          <h1 className="header-h1">The Path.</h1>
        </Link>
        <p className="header-subtitle">Gamify your life.</p>

        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg header-button" to="/Stats">
                Stats
              </Link>
              <Link className="btn btn-lg header-button" to="/Quests">
                Quests
              </Link>
              <button className="btn btn-lg header-logout" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link variant className="btn btn-lg header-login" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg header-signup" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
