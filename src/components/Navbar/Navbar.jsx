// import React from "react";
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
          <Link className="Food" to="/?cat=food">
            Link
          </Link>
          <Link className="Travel" to="/?cat=travel">
            Link
          </Link>
          <Link className="Wellness" to="/?cat=wellness">
            Link
          </Link>
          <Link className="Art" to="/?cat=art">
            Link
          </Link>
          <Link className="Technology" to="/?cat=technology">
            Link
          </Link>
          <Link className="Entertainment" to="/?cat=entertainment">
            Link
          </Link>
          <span>Jen</span>
          <span>Logout</span>
          <span>
            <Link className="Write" to="/write">
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
