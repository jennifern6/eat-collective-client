import { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Single.scss";
import Edit from "../../assets/images/edit.png";
import Delete from "../../assets/images/delete.png";
import Menu from "../../components/Menu/Menu.jsx";
import { AuthContext } from "../../context/authContext.jsx";
import moment from "moment";
import axios from "axios";
import DOMPurify from "dompurify";

const Single = () => {
  const [post, setPost] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const postId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/posts/${postId}`
        );
        setPost(res.data);
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/posts/${postId}`);
      navigate("/");
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  if (!post) {
    return <p>Loading...</p>; // Display loading state while fetching data
  }


  return (
    <div className="single">
      {/* Content Section */}
      <div className="single__content">
        {post.img && (
          <img
            className="single__content-image"
            src={`${post.img}`}
            alt="Content"
          />
        )}

        <div className="single__user-container">
          <div className="single__user">
            {post.userImg && (
              <img
                className="single__user-image"
                src={post.userImg}
                alt={`${post.username}'s avatar`}
              />
            )}
          </div>

          <div className="single__info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>

          {currentUser.username === post.username && (
            <div className="single__edit">
              <Link to={`/write?edit=2`} state={post}>
                <img className="single__logo" src={Edit} alt="Edit Logo" />
              </Link>
              <img
                className="single__logo"
                onClick={handleDelete}
                src={Delete}
                alt="Delete Logo"
              />
            </div>
          )}
        </div>

        <h1 className="single__text">{post.title}</h1>
        <p className="single__description" dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize>(post.desc),
          }}
        ></p>
      </div>

      {/* Menu Section */}
      <div className="single__menu">
        <Menu cat={post.cat} />
      </div>
    </div>
  );
};

export default Single;
