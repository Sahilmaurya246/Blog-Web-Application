"use client";

import { useParams, useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";
import "./Edit.css";


function EditPage() {
  const { id } = useParams();
  const router = useRouter();
  const { posts, setPosts } = useContext(AppContext);

  const post = posts[id];

  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");

  const handleSave = () => {
    const updatedPosts = [...posts];

    updatedPosts[id] = {
      ...updatedPosts[id],
      title,
      content,
    };

    setPosts(updatedPosts);

    router.push("/profile"); 
  };

  const handleDelete = () => {
    const updatedPosts = posts.filter((_, i) => i != id);
    setPosts(updatedPosts);

    router.push("/profile");
  };

  return (
    <div style={{ maxWidth: "800px", margin: "50px auto" }}>
      <h2>Edit Post</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", padding: "10px", marginTop: "10px" }}
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: "100%", height: "150px", marginTop: "10px" }}
      />

      <button onClick={handleSave} style={{ marginTop: "15px" }}>
        Save
      </button>

      <button
        onClick={handleDelete}
        style={{ marginLeft: "10px", color: "red" }}
      >
        Delete
      </button>
    </div>
  );
}

export default EditPage;