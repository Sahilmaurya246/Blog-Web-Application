"use client";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation"; 
import { AppContext } from "../Context/AppContext";
import "./Login.css";

function Login() {

  const { setIsLoggedIn } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();

  const [login, setlogin] = useState(true);

  const handleLogin = async (e) => {
  e.preventDefault();

  const res = await fetch("http://127.0.0.1:8000/auth/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("login", "true");
      console.log("EMAIL VALUE:", email);
      localStorage.setItem("username", email.split("@")[0]);
      setIsLoggedIn(true);
      alert("Login successful");

      router.push("/");
    }
    else {
      alert("User not found! Please signup first");
      setlogin(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:8000/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username,
      email,
      password
    })
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("login", "true");
    localStorage.setItem("username", username);
    setIsLoggedIn(true);

    alert("Signup successful");
    router.push("/");
  }
};

  return (
    <div id="container">
      <div id="form-container">

        <div id="form-button">
          <button
            className={login ? "active" : ""}
            onClick={() => setlogin(true)}>Login
          </button>

          <button
            className={!login ? "active" : ""}
            onClick={() => setlogin(false)}>Sign Up
          </button>
        </div>

        {login ? (
          <div id="loginform">
            <h1 id="Login-element">Login Form</h1>

            <form onSubmit={handleLogin}>
              <input type="email" required placeholder="Enter your Email" value={email}onChange={(e) => setEmail(e.target.value)}/>
              <input type="password" required placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <br />

              {/* <a id="forget" href="#">Forgot Password</a>
              <br /> */}

              <button id="login-button" type="submit" >
                Login
              </button>
 
              <p>
                I am not Register?{" "}
                <button type="button" onClick={() => setlogin(false)}>Sign Up</button>
              </p>
            </form>
          </div>
        ) : (
          <div id="loginform">
            <h1>Sign Up Form</h1>

            <form onSubmit={handleSignup}>
              <input type="text" required placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
              <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
              <input type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
              {/* <input type="password" required placeholder="Confirm password" /> */}
              <br />

              <button id="login-button" type="submit">
                Sign Up
              </button>
              
            </form>
          </div>
        )}

      </div>
    </div>
  );
}

export default Login;