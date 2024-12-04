import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import "./Menu.scss";

const Menu = ({ cat }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/posts/?cat=${cat}`
        );
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div className="menu">
      <h1 className="menu__title1">Other posts you may like</h1>
      {posts.map((post) => (
        <div className="menu__post" key={post.id}>
          <img className="menu__image" src={post.img} alt="Content Image" />
          <h2 className="menu__title">{post.title}</h2>
          
          <Link to={`/post/${post.id}`}>
            <button>Read More</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Menu;

