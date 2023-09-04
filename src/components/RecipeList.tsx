import { ProductOnUser, Recipe } from "@/types/Interfaces";
import axios from "axios";
import { useEffect, useState } from "react";

const RecipeList = () => {
  const [token, setToken] = useState<null | string>(null);

  useEffect(() => {
    const tokenFromLs = localStorage.getItem("token");
    if (tokenFromLs) {
      setToken(tokenFromLs);
    }
  }, []);

  return (
    <>
      <h1 className="text-lg font-bold">Recipe List</h1>
      <div className="flex flex-col h-40 bg-gray-400 justify-center items-center my-4">
        <h2 className="text-lg font-bold">Recipe of the Day!</h2>
        <p></p>
      </div>
      <p>other available recipes:</p>
      <div className="mt-4">
        <ul>
          <li>
            <div className="flex flex-row mb-4 rounded-xl border-solid border-2 border-gray-400 drop-shadow-lg">
              <img
                className="rounded-xl border-dashed border-2 border-gray-400"
                src="https://picsum.photos/100"
                alt="lorem picsum"
              />
              <div className="flex flex-col p-4 w-full">
                <span>Recipe name</span>
                <div className="flex flex-row justify-between">
                  <span>prep time: 30mins</span>
                  <span>servings: 👤👤👤👤</span>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="flex flex-row mb-4 rounded-xl border-solid border-2 border-gray-400 drop-shadow-lg">
              <img
                className="rounded-xl border-dashed border-2 border-gray-400"
                src="https://picsum.photos/100"
                alt="lorem picsum"
              />
              <div className="flex flex-col p-4 w-full">
                <span>Recipe name</span>
                <div className="flex flex-row justify-between">
                  <span>prep time: 40mins</span>
                  <span>servings: 👤👤👤</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default RecipeList;
