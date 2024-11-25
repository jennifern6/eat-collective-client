import React from "react";
import Logo from "../../assets/images/logo.png";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <img className="footer__logo" src={Logo} alt="Logo" />
        <span className="footer__text">
          Copyright Eat Collective ♥️ &copy; 2024 All Rights Reserved
        </span>
      </div>
    </footer>
  );
};

export default Footer;
