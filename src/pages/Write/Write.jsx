import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./Write.scss"



  const Write = () => {
    const [value, setValue] = useState("");

    return (
      <div>
        <div className="write">
          <div className="write__content">
            <input type="text" placeholder="Title" />
            <div className="editorContainer">
              <ReactQuill theme="snow" value={value} onChange={setValue} />
            </div>
          </div>
          <div className="write__menu">
            <div className="write__item">
              <h1>Publish</h1>
              <span>
                <b>Status:</b> Draft
              </span>

              <span>
                <b>Visibility:</b> Public
              </span>
              <input type="file" id="file" name=""/>
              <label htmlFor="file">Upload Image

              </label>
            </div>
            <div className="write__item">item2</div>
          </div>
        </div>
      </div>
    );
  };

  export default Write;
