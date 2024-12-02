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

axios.defaults.withCredentials = true;

const Single = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const postId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts/${postId}`);
        if (res.data.img) {
          try {
            const imgObj = JSON.parse(res.data.img);
            res.data.img = imgObj.filename;
          } catch (e) {
            console.error("Error parsing image JSON:", e);
          }
        }
        setPost(res.data);
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/posts/${postId}`);
      alert("Post deleted successfully");
      navigate('/'); // Navigate to home or another page
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Not authenticated! Please log in.");
      } else if (err.response?.status === 403) {
        alert("You can only delete your own post.");
      } else {
        alert("An error occurred. Please try again.");
      }
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // A simple loading state
  }

  return (
    <div className="single">
      <div className="single__content">
        <img
          className="single__content-image"
          src={post?.img ? `../upload/${post.img}` : "default-image.png"}
          alt={post?.title || "Post content"}
        />

        <div className="single__user-container">
          <div className="single__user">
            {post?.userImg && (
              <img src={post.userImg} alt={`${post?.username || "User"}'s avatar`} />
            )}
            <div className="single__info">
              <span>{post?.username || "Unknown User"}</span>
              <p>Posted {moment(post?.date).fromNow()}</p>
            </div>

            {currentUser?.username === post?.username && (
              <div className="single__edit">
                <Link to={`/write?edit=2`} state={post}>
                  <img className="single__logo" src={Edit} alt="Edit Post" />
                </Link>
                <img
                  className="single__logo"
                  onClick={handleDelete}
                  src={Delete}
                  alt="Delete Post"
                />
              </div>
            )}
          </div>

          <h1 className="single__text">{post?.title || "Untitled Post"}</h1>
          <p
            className="single__description"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post?.desc || ""),
            }}
          ></p>
        </div>
      </div>

      <div className="single__menu">
        <Menu cat={post?.cat || "default-category"} />
      </div>
    </div>
  );
};

export default Single;
