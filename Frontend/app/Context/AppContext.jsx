"use client";
import { createContext, useState, useEffect } from "react";
export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("login") === "true");
  }, []);

  const addPost = (title, content) => {
    const newPost = {
      title,
      content,
      author: "Sahil Maurya",
      date: new Date().toLocaleDateString(),
    };

    setPosts([...posts, newPost]);
  };

  return (
    <AppContext.Provider
      value={{ posts, setPosts, addPost, isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </AppContext.Provider>
  );
}