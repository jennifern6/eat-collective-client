import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Write.scss";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import DOMPurify from "dompurify";

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.title || "");
  const [title, setTitle] = useState(state?.desc || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");
  const navigate = useNavigate();

  // Function to extract plain text from HTML
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  // Handle changes to the editor content
  const handleQuillChange = (newValue) => {
    setValue(newValue);
    // Extract and set plain text as the title
    setTitle(getText(newValue));
  };

  const uploadImage = async () => {
    if (!file) return "";
    try {
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/upload`,
        formData,
        {
          withCredentials: true,
        }
      );
      return data;
    } catch (err) {
      console.error("Image upload failed:", err);
      return "";
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    try {
      const sanitizedDesc = DOMPurify.sanitize(value);
      const imgUrl = await uploadImage();
      const config = { withCredentials: true };
      const date = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");

      const postData = {
        title,
        desc: sanitizedDesc,
        cat,
        img: file ? imgUrl : "",
        date: !state ? date : undefined,
      };

      if (state) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/posts/${state.id}`,
          postData,
          config
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/posts/`,
          postData,
          config
        );
      }
      navigate("/");
    } catch (err) {
      console.error("Failed to save post:", err);
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
          <label htmlFor="file" className="upload-label">
            Upload Image
          </label>
          <div className="write__buttons">
            <button className="write__button">Save as Draft</button>
            <button onClick={handlePublish} className="write__button-publish">
              Publish
            </button>
          </div>
        </div>

        {/* Category Section */}
        <div className="write__item">
          <h1>Category</h1>
          <div className="write__item-container">
            <input
              type="radio"
              checked={cat === "food"}
              name="cat"
              value="food"
              id="food"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="food">Food</label>
          </div>

          <div className="write__item-container">
            <input
              type="radio"
              checked={cat === "travel"}
              name="cat"
              value="travel"
              id="travel"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="travel">Travel</label>
          </div>

          <div className="write__item-container">
            <input
              type="radio"
              checked={cat === "art"}
              name="cat"
              value="art"
              id="art"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">Art</label>
          </div>

          <div className="write__item-container">
            <input
              type="radio"
              checked={cat === "technology"}
              name="cat"
              value="technology"
              id="technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology">Technology</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
