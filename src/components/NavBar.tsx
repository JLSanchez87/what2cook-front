import { User } from "@/types/Interfaces";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const NavBar = () => {
  const [token, setToken] = useState<null | string>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const tokenFromLs = localStorage.getItem("token");
    if (tokenFromLs) {
      setToken(tokenFromLs);
    }
  }, []);

  useEffect(() => {
    const getUserInfo = async () => {
      if (token) {
        try {
          const response = await axios.get("http://localhost:3001/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const userData = response.data;
          setUser(userData);
        } catch (error) {
          console.log("Error fetching user information:", error);
        }
      }
    };
    getUserInfo();
  }, [token]);

  const handleClick = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  if (user === null) {
    return <p>Loading book, please wait...</p>;
  }

  return (
    <nav className="flex flex-row justify-between p-8">
      <h1 className="text-xl font-bold drop-shadow-lg hover:drop-shadow-xl">
        🧑🏻‍🍳 what2cook
      </h1>
      <div className="flex flex-row">
        <span className="mx-4">
          <Link href="/">My fridge</Link>
        </span>
        <span className="mx-4">
          {token ? (
            <Link href="/account">{user.username}</Link>
          ) : (
            <Link href="/register">Register</Link>
          )}
        </span>
        <span className="mx-4">
          {token ? (
            <Link href="/" onClick={handleClick}>
              Logout
            </Link>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </span>
      </div>
    </nav>
  );
};

export default NavBar;
