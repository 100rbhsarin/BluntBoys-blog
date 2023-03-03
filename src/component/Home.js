import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axioss/axios";
// import notes from "./Single"; 


const Home = () => {
  const [notes, setnotes] = useState([]);

  
  
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/notes`);
        setnotes(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  
  
  


  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  

  return (
    <div className="home">
    <div className="posts">
      {notes.map((note,k) => (
        <div className="post" key={k}>
          <div className="img">
            <img src={`./upload/${note.img}`} alt="" />
          </div>
          <div className="content">
            <Link className="link" to= 
             {`/notes/${note._id}`}
             >
              <h1>{note.title}</h1>
            </Link>
            <p>{getText(note.text)}</p>
           <Link to= 
             {`/notes/${note._id}`}><button >Read More</button></Link> 
          </div>
        </div>
      ))}
    </div>
  </div>
);
};
// }

export default Home;