import { useState } from 'react';
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
              <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
            </div>
          </div>


          <div className="write__menu">
            {/* Item 1 Section */} 
            <div className="write__item">
              <h1>Publish</h1>
              <span>
                <b>Status:</b> Draft
              </span>

              <span>
                <b>Visibility:</b> Public
              </span>
              <input style={{ display: "none" }} type="file" id="file" name=""/>
              <label htmlFor="file">Upload Image
              </label>
              <div className="write__buttons">
                <button>
                  Save as a draft
                </button>
                <button>
                  Update
                </button>

              </div>
            </div>

            {/* Item 2 Section */} 
            <div className="write__item">
              <h1>Category</h1>
              <input type="radio" name="cat" value="food" id="food"/>
              <label htmlFor="food">Food</label>
              <input type="radio" name="cat" value="travel" id="travel"/>
              <label htmlFor="travel">Travel</label>
              <input type="radio" name="cat" value="wellness" id="wellness"/>
              <label htmlFor="wellness">Wellness</label>
              <input type="radio" name="cat" value="art" id="art"/>
              <label htmlFor="art">Art</label>
              <input type="radio" name="cat" value="technology" id="technology"/>
              <label htmlFor="technology">Technology</label>
              <input type="radio" name="cat" value="entertainment" id="entertainment"/>
              <label htmlFor="entertainment">Entertainment</label>

            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Write;
