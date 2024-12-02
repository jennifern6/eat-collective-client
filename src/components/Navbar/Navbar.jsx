import { useContext } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { AuthContext } from "../../context/authContext.jsx";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

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

          <Link className="Art" to="/?cat=art">
            Art
          </Link>
          <Link className="Technology" to="/?cat=technology">
            Technology
          </Link>

          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}

          <span>
            <Link className="Write" to="/write">
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
