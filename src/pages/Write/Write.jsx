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
            <div className="write__item">item1</div>
            <div className="write__item">item2</div>
          </div>
        </div>
      </div>
    );
  };

  export default Write;
