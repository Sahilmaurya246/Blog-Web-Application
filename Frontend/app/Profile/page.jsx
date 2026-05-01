"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./profile.css";

function Profile() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [posts, setPosts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    const fetchMyPosts = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        router.push("/Login");
        return;
      }
      try {
        const res = await fetch("https://blog-web-application-3-52p1.onrender.com/posts/my-posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setPosts(data);
        } else {
          console.log(data);
        }
      } catch (err) {
        console.log("Error:", err);
      }
    };

    fetchMyPosts();
  }, []);

  const handleEdit = (post) => {
    setEditingId(post.id);
    setEditedTitle(post.title);
    setEditedContent(post.content);
  };

  const handleSave = async (post_id) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`https://blog-web-application-3-52p1.onrender.com/posts/${post_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: editedTitle,
        content: editedContent,
      }),
    });

    if (res.ok) {
      alert("Post updated");
      setEditingId(null);

      setPosts((prev) =>
        prev.map((p) =>
          p.id === post_id
            ? { ...p, title: editedTitle, content: editedContent }
            : p
        )
      );
    } else {
      alert("Update failed");
    }
  };


  const handleDelete = async (post_id) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`https://blog-web-application-3-52p1.onrender.com/posts/${post_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      alert("Post deleted");

      // update UI
      setPosts((prev) => prev.filter((p) => p.id !== post_id));
    } else {
      alert("Delete failed");
    }

  };
  useEffect(() => {
    const name = localStorage.getItem("username");

    console.log("PROFILE NAME:", name); // debug

    if (name && name !== "undefined") {
      setUsername(name);
    }
  }, []);

  const getFirstName = (name) => {
    if (!name) return "User";

    const first = name.split(" ")[0];

    return first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
  };


  return (
    <div id="profile-container-box">
      <div id="profile_circle-name">
        {username ? username.charAt(0).toUpperCase() : "U"}
          
      </div>

      <div id="main-name-profile">
        <p>{getFirstName(username)}</p>
      </div>

      <div id="blog-writer-profile">
        <p>Blog Writer | Learner</p>
      </div>

      <h2 id="post-profile-allshow">My Posts</h2>

      {posts.map((post) => (
        <div key={post.id} id="blog-box-profile">

          <div className="post-header">
            <div id="user-icon">
                {username ? username.charAt(0).toUpperCase() : "U"}
              </div>
            <p className="author">You</p>
          </div>

        
          {editingId === post.id ? (
            <input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          ) : (
            <h2 className="tital-profile-box">{post.title}</h2>
          )}

          
          {editingId === post.id ? (
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
          ) : (
            <p className="tital-profile-content">{post.content}</p>
          )}

          <div id="manage-icon">
            <i className="fa-solid fa-heart"></i>
            <i className="fa-solid fa-thumbs-down"></i>
            <i className="fa-solid fa-paper-plane"></i>
            <i className="fa-solid fa-comment"></i>

            
            {editingId === post.id ? (
              <button onClick={() => handleSave(post.id)}>Save</button>
            ) : (
              <i
                className="fa-solid fa-pen-to-square"
                onClick={() => handleEdit(post)}
              ></i>
            )}

            
            <i
              className="fa-solid fa-trash"
              onClick={() => handleDelete(post.id)}
            ></i>

            
            <p className="date">
              {post.created_at?.split("T")[0]}
            </p>
            
          </div>
        </div>
      ))}
    </div>
  );
}

export default Profile;