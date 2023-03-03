import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "../axioss/axios";
import { useLocation, useNavigate,useParams } from "react-router-dom";
import moment from "moment";

const Write = () => {
const state = useLocation().state;
// const id  = state._id;
  const navigate = useNavigate();
  console.log(useLocation(),useParams())

const [value, setValue] = useState(state?.text || "")
const [ title,setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");
  

  

  const upload = async (e) => {
    e.preventDefault();
     const fileValue=file
    try {
      const formData = new FormData();
      formData.append("file", fileValue);
      const res = await axios.post("/upload", formData);
      // console.log(res.data)
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload(e);
    console.log(imgUrl)
    try {
      state
        ? await axios.patch(`/notes/${state._id}`, {

            title,
            text: value,
            img: file ? imgUrl : "",
          
          })
        : await axios.post(`/notes`, {
            title,
            text: value,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
          navigate("/")
    } catch (err) {
      console.log(err);
    }
  }

  return (
    
    
    <div className="add">
      <div className="content">
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
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "art"}
              name="cat"
              value="art"
              id="art"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="art">DEVELOPER</label>
          </div>
         
          </div>
        </div>
      </div>
  );
};

export default Write;