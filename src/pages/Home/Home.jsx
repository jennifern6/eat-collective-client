import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./Home.scss";


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
              const imgObj = JSON.parse(post.img);
              post.img = imgObj.filename;
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
    return doc.body.textContent || "";
  };

  const limitWords = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
  };

  const [expanded, setExpanded] = useState({});

  const toggleReadMore = (id) => {
    setExpanded((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div className="posts">
      <div className="posts__container">
        {posts.map((post) => {
          const isExpanded = expanded[post.id];
          const description = isExpanded ? getText(post.desc) : limitWords(getText(post.desc), 20);

          return (
            <div className="post" key={post.id}>
              <div className="post__image-container">
                <img className="post__image" src={`../upload/${post?.img}`} alt={post.title} />
              </div>
              <div className="post__content">
                <Link className="post__link" to={`/post/${post.id}`}>
                  <h1 className="post__title">{getText(post.title)}</h1>
                </Link>
                <p className="post__description">{description}</p>
                <button
                  className="post__button"
                  onClick={() => toggleReadMore(post.id)}
                >
                  {isExpanded ? "Show Less" : "Read More"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
