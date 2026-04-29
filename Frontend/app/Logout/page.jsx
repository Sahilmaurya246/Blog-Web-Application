
"use client";
import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation"; 
import { AppContext } from "../Context/AppContext";

function Logout() {
  const router = useRouter();
  const { setIsLoggedIn } = useContext(AppContext);

  useEffect(() => {
    localStorage.removeItem("login");   
    setIsLoggedIn(false);               
    router.push("/Login");              
  }, []);

  return <h1>Logging out...</h1>;
}

export default Logout;