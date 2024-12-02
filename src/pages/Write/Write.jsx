import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Write.scss";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/upload`, formData, {
        withCredentials: true, // Ensure cookies are sent with this request
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      const config = {
        withCredentials: true, // Ensure cookies are sent with this request
      };

      if (state) {
        // Update existing post
        await axios.put(`${import.meta.env.VITE_API_URL}/api/posts/${state.id}`, {
          title,
          desc: value,
          cat,
          img: file ? imgUrl : "",
        }, config);
      } else {
        // Create a new post
        await axios.post(`${import.meta.env.VITE_API_URL}/api/posts/`, {
          title,
          desc: value,
          cat,
          img: file ? imgUrl : "",
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        }, config);
      }
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="write">
      <div className="write__content">
        <input 
          type="text" 
          placeholder="Title" 
          value={title}
          onChange={(e) => setTitle(e.target.value)} 
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>

      <div className="write__menu">
        {/* Publish Section */}
        <div className="write__item">
          <h1>Publish</h1>
          <span>
            <b>Status:</b> Draft
          </span>
          <span>
            <b>Visibility:</b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="file" className="upload-label">Upload Image</label>
          <div className="write__buttons">
            <button className="write__button">Save as Draft</button>
            <button onClick={handleClick} className="write__button-publish">
              Publish
            </button>
          </div>
        </div>

        {/* Category Section */}
        <div className="write__item">
          <h1>Category</h1>
          {["food", "travel", "art", "technology"].map((category) => (
            <div className="write__item-container" key={category}>
              <input
                type="radio"
                name="cat"
                value={category}
                id={category}
                checked={cat === category}
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Write;
