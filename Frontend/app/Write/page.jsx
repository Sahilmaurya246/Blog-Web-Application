"use client";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation"; 
import { AppContext } from "../Context/AppContext"; 
import "./Write.css";

function Write() {

  const router = useRouter();

  const [showIcons1, setShowIcons1] = useState(false);
  const [showIcons2, setShowIcons2] = useState(false);

  const handleClick1 = () => {
    setShowIcons1(!showIcons1);
  };

  const handleClick2 = () => {
    setShowIcons2(!showIcons2);
  };

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");


  const Submit = async () => {
  if (!title || !content) return;

  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    router.push("/Login");
    return;
  }

  const res = await fetch("http://127.0.0.1:8000/posts/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      title,
      content
    })
  });

  const data = await res.json();

  if (res.ok) {
    alert("Post created successfully");
    setTitle("");
    setContent("");
    router.push("/");
  } 
  
  else {
    alert(data.detail);
  }
  
};
  return (
    <div id="body-box">
      <header>
        <div id="write-header">
          <ul>
            <h1 id="heading-headerfile">Medium</h1>

            <li className="submit-button">
              <button onClick={Submit}>Publish</button>
            </li>

            <li className="submit-button">
              <i className="fa-solid fa-ellipsis"></i>
            </li>

            <li className="submit-button">
              <i className="fa-solid fa-bell"></i> 
            </li>

            <li className="submit-button">
              <i className="fa-solid fa-user"></i>
            </li>
          </ul>
        </div>
      </header>

      <div id="title-box">
        <div id="plus-icon" onClick={handleClick1}>
          <i className="fa-solid fa-plus"></i>
        </div>

        {showIcons1 && (
          <div className="box-menu-icons">
            <i className="fa-regular fa-image"></i>
            <i className="fa-solid fa-upload"></i>
            <i className="fa-solid fa-video"></i>
            <i className="fa-solid fa-code"></i>
            <i className="fa-solid fa-ellipsis"></i>
          </div>
        )}

        <input
          id="filling"
          type="text"
          placeholder="Give Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div id="Descriptions-box">
        <div id="plus-icon2" onClick={handleClick2}>
          <i className="fa-solid fa-plus"></i>
        </div>

        {showIcons2 && (
          <div className="box-menu-icons">
            <i className="fa-regular fa-image"></i>
            <i className="fa-solid fa-upload"></i>
            <i className="fa-solid fa-video"></i>
            <i className="fa-solid fa-code"></i>
            <i className="fa-solid fa-ellipsis"></i>
          </div>
        )}

        <textarea
          id="descriptions-filling"
          placeholder="Give Description"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Write;