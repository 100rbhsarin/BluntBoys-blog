import React, { useEffect, useState } from "react";
import Edit from "../img/edit.jpg";
import Delete from "../img/delet.jpg";
import { Link, useParams, useNavigate } from "react-router-dom";
import Menu from "./main/Menu";
import axios from "../axioss/axios";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";




const Single = () => {
  const [note, setnote] = useState({});

  

  // const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

 

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/notes/${id}`);
        // console.log(res.data)
        setnote(res.data);
      } catch (err) {
        console.log(err);
        
      }
    };
    fetchData();
  }, [id]);
  
  const handleDelete = async (id)=>{
    try {
      await axios.delete(`/notes/${id}`);
      navigate("/")
  
    } catch (err) {
      console.log(err);
    }
  }

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className="single">
      <div className="content">
        <img src={`../upload/${note?.img}`} alt="" />
        <div className="user">
          {note.userImg && <img
            src={note.userImg}
            alt=""
          />}
          <div className="info">
            <span>{note.username}</span>
            {/* <p>noted {moment(note.date).fromNow()}</p> */}
            <p>{note.createdAt}</p>
          </div>
          {currentUser.username === note.username && (
         
            <div className="edit">
              <Link to={`/write?edit=${note._id}`} state={note}>
                <img src={Edit} alt="" />
              </Link>
             
              <img  onClick={() => {
                handleDelete(note._id);
              }} src={Delete} alt="" />
            </div>
            
          )}
        </div>
        <h1>{note.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(note.text),
          }}
        ></p>      </div>
      <Menu cat={note.id}/>
    </div>
  );
};

export default Single;