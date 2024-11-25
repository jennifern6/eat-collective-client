import React from "react";
import { Link } from "react-router-dom"; // Ensure Link is uncommented for routing.
import "./Single.scss";
import Edit from "../../assets/images/edit.png";
import Delete from "../../assets/images/delete.png";

const Single = () => {
  return (
    <div className="single">
      {/* Content Section */}
      <div className="single__content">
        <p>Content</p>
        <img
          className="single__content-image"
          src="https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Content"
        />
        <div className="single__user-container">
          <div className="single__user">
            <img
              className="single__user-image"
              src="https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="User"
            />
          </div>

          <div className="single__info">
            <span>Jen</span>
            <p>Posted 2 days ago</p>
          </div>

          <div className="single__edit">
            <Link to={`/write?edit=2`}>
              <img className="single__logo" src={Edit} alt="Edit Logo" />
            </Link>

            <Link to={`/delete`}>
              <img className="single__logo" src={Delete} alt="Delete Logo" />
            </Link>
          </div>
        </div>
        <h1 className="single__text">
          Title
        </h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit,
          commodi atque! Quibusdam laudantium officia architecto minima
          explicabo blanditiis nobis labore, itaque omnis sequi praesentium.
          Accusamus ad unde molestiae reiciendis similique?
        </p>
      </div>

      {/* Menu Section */}
      <div className="single__menu">menu</div>
    </div>
  );
};

export default Single;
