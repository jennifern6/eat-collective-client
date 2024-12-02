import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }



  return (
    <div className="posts">
      <div className="posts__container">
        {posts.map((post) => (
          <div className="post" key={post.id}>

            <div className="post__image-container">
              <img className="post__image" src={post.img} alt={post.title} />
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
