"use client";
import Link from "next/link";   
import { useState, useContext, useEffect } from "react";
import "./Navbar.css";
import { AppContext } from "../Context/AppContext"; 

function Navbar() {
  const [Menu, setMenu] = useState(false);
  const [username, setUsername] = useState("");

  const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);

  const ProfileMenu = () => {
    setMenu(!Menu);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("username");

    if (token) {
      setIsLoggedIn(true);
    }

    if (name) {
      setUsername(name);
    }

  }, []);

  const getFirstName = (name) => {
  if (!name) return "User";

  const first = name.split(" ")[0];
  return first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
};

  return (
    <nav className="navbar">
      <div id="novbar-box">
        <h2>Blog Web</h2>

        <ul>
          <li>
            <Link href="/" >Home</Link>
          </li>

          {isLoggedIn ? (
            <>
              <li>
                <Link href="/Write">Write</Link>
              </li>

              <li id="Profile-Tab">
                <div id="Profile-box" onClick={ProfileMenu}>
                  <div id="maurya" >
                    {username ? username.charAt(0).toUpperCase() : "U"}

                  </div>
                </div>

                {Menu && (
                  <div className="Profile-ShowMenu">
                    <Link href="/Profile" onClick={() => setMenu(false)}>
                      <i className="fa-solid fa-user"></i> Profile
                    </Link>

                    <Link href="/Logout" onClick={() => setMenu(false)}>
                      <i className="fa-solid fa-right-from-bracket"></i> Logout
                    </Link>
                  </div>
                )}
              </li>
            </>
          ) : (
            <li>
              <Link href="/Login">Login / Sign Up</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;