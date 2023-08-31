import Link from "next/link";
import { useEffect, useState } from "react";

const NavBar = () => {
  const [token, setToken] = useState<null | string>(null);
  useEffect(() => {
    const tokenFromLs = localStorage.getItem("token");
    if (tokenFromLs) {
      setToken(tokenFromLs);
    }
  }, []);

  const handleClick = () => {
    localStorage.removeItem("token");
    setToken(null);
  };
  return (
    <nav className="flex flex-row justify-between p-8">
      <h1 className="text-xl font-bold drop-shadow-lg">🧑🏻‍🍳 what2cook</h1>
      <div className="flex flex-row">
        <span className="mx-4">
          <Link href="/">My fridge</Link>
        </span>
        <span className="mx-4">
          {token ? (
            <Link href="/account">User name here</Link>
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
