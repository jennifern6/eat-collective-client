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
            Food
          </Link>
          <Link className="Travel" to="/?cat=travel">
            Travel
          </Link>
          <Link className="Wellness" to="/?cat=wellness">
            Wellness
          </Link>
          <Link className="Art" to="/?cat=art">
            Art
          </Link>
          <Link className="Technology" to="/?cat=technology">
            Technology
          </Link>
          <Link className="Entertainment" to="/?cat=entertainment">
            Entertainment
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
