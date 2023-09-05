import { User } from "@/types/Interfaces";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
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

  const router = useRouter();

  const handleClick = () => {
    localStorage.removeItem("token");
    setToken(null);
    // router.push("/");
    window.location.reload();
  };

  if (user === null) {
    return;
  }

  return (
    <nav className="flex flex-row justify-between p-8 rounded-b-3xl bg-header">
      <h1 className="text-2xl font-bold drop-shadow-lg font-lobster">
        🧑🏻‍🍳what2cook
      </h1>
      <div className="flex flex-row">
        <span className="mx-4 transition ease-in-out delay-100 hover:scale-105 hover:underline-offset-4">
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
