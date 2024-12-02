import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts${cat}`);
        const posts = res.data.map((post) => {
          if (post.img) {
            try {
              // Parse the JSON string to extract the filename if it's valid JSON
              const imgObj = JSON.parse(post.img);
              post.img = imgObj.filename; // Update to use just the filename
            } catch (e) {
              console.error("Error parsing image JSON:", e);
            }
          }
          return post;
        });
        setPosts(posts);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    fetchData();
  }, [cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="posts">
      <div className="posts__container">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="post__image-container">
              <img className="post__image" src={`../upload/${post?.img}`} alt={post.title} />
            </div>
            <div className="post__content">
              <Link className="post__link" to={`/post/${post.id}`}>
                <h1 className="post__title">{post.title}</h1>
              </Link>
              <p className="post__description">{getText(post.desc)}</p>
              <button className="post__button">Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
