"use client";
import { useState, useEffect } from "react";
import "./globals.css";

function Home() {
  
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/posts/");
        const data = await res.json();

        if (res.ok) {
          setPosts(data);
        } 
        else {
          console.log("Error:", data);
        }
      }
      catch (error) {
        console.log("Server error", error);
      }
    };

    fetchPosts();
  }, []);

  
  return (
    <div>
      {posts?.map((post, index) => (
        <div key={index} id="home-box">

          <div className="post-header">
            <i id="user-icon" className="fa-solid fa-user"></i>
            <p className="author">{post.username}</p>
          </div>

          <h2 className="tital-home-box">{post.title}</h2>
          <p className="tital-home-content">{post.content}</p>

          <div id="manage-icon">
            <i className="fa-solid fa-heart"></i>
            <i className="fa-solid fa-thumbs-down"></i>
            <i className="fa-solid fa-paper-plane"></i>
            <i className="fa-solid fa-comment"></i>
            <p className="date">{post.created_at?.split("T")[0]}</p>
          </div>

        </div>
      ))}
    </div>
  );
}

export default Home;