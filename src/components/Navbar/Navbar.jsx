import React from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar__container">
        <div className="navbar__logo-container">
          <Link to="/">
            <img className="navbar__logo" src={Logo} alt="Logo" />
          </Link>
        </div>

        <div className="navbar__links">
          <Link className="link" to="/?cat=link">
            Link
          </Link>
          <Link className="link" to="/?cat=link">
            Link
          </Link>
          <Link className="link" to="/?cat=link">
            Link
          </Link>
          <Link className="link" to="/?cat=link">
            Link
          </Link>
          <Link className="link" to="/?cat=link">
            Link
          </Link>
          <Link className="link" to="/?cat=link">
            Link
          </Link>
          <span>Jen</span>
          <span>Logout</span>
          <span>
            <Link className="link" to="/write">
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
