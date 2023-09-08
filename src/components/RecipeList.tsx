import { Recipe } from "@/types/Interfaces";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { motion, useScroll } from "framer-motion";

const RecipeList = () => {
  const [token, setToken] = useState<null | string>(null);
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [randomRecipe, setRandomRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const tokenFromLs = localStorage.getItem("token");
    if (tokenFromLs) {
      setToken(tokenFromLs);
    }

    const getRecipeIdFromApi = async () => {
      try {
        const response = await axios.get(
          `${process.env["NEXT_PUBLIC_API_URL"]}/compare-products`,
          {
            headers: {
              Authorization: `Bearer ${tokenFromLs}`,
            },
          }
        );

        // Get the ID's from the comparison endpoint
        const matchingRecipeIds = response.data.matchingRecipeIds;

        // Get the recipes
        const matchingRecipes = await axios.get(
          `${process.env["NEXT_PUBLIC_API_URL"]}/recipes`
        );

        // filter our the recipes that doesn't correspond with the comparison endpoint
        const filteredRecipes = matchingRecipes.data.filter((recipe: Recipe) =>
          matchingRecipeIds.includes(recipe.id)
        );

        // Set the matching recipes to the state
        setRecipes(filteredRecipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
    getRecipeIdFromApi();
  }, []);

  useEffect(() => {
    const getRandomRecipeFromApi = async () => {
      try {
        const response = await axios.get(
          `${process.env["NEXT_PUBLIC_API_URL"]}/recipe/random`
        );
        setRandomRecipe(response.data);
      } catch (error) {
        console.log("Error fetching recipe:", error);
      }
    };
    getRandomRecipeFromApi();
  }, []);

  return (
    <div>
      {randomRecipe === null ? (
        <p>Loading random recipe..</p>
      ) : (
        <div key={randomRecipe.id}>
          <h1 className="text-lg font-bold">Recipe List</h1>
          <div
            className="flex flex-col items-center justify-center my-4 bg-center bg-cover h-96 bg-header rounded-2xl"
            style={{ backgroundImage: `url(${randomRecipe.recipeImg})` }}
          >
            <h2 className="p-2 text-lg font-bold rounded-lg bg-header">
              Recipe of the Day!
            </h2>
            <Link href={`recipes/${randomRecipe.id}`}>
              <p className="p-2 rounded-b-lg bg-header">
                {randomRecipe.recipename}
              </p>
            </Link>
          </div>
          <p>other available recipes:</p>
        </div>
      )}
      <ScrollArea className="flex flex-row w-full p-4 overflow-auto md:border rounded-2xl snap-x">
        {recipes === null ? (
          <p>Loading recipes..</p>
        ) : (
          recipes.map((recipe) => {
            return (
              <Link key={recipe.id} href={`recipes/${recipe.id}`}>
                <div
                  key={recipe.id}
                  className="flex flex-row around w-[300px] mr-4 border-2 border-solid border-header rounded-xl drop-shadow-lg scroll-m-3 snap-start"
                >
                  <img
                    className="object-cover object-center w-20 h-20 border-2 border-dashed border-header rounded-xl"
                    src={recipe.recipeImg}
                    alt={recipe.description}
                  />
                  <div className="flex flex-col w-full p-4 text-cta">
                    <span className="font-bold">{recipe.recipename}</span>
                    <div className="flex flex-row justify-between">
                      <span>⏲: {recipe.prepTime}mins</span>
                      <span>
                        {recipe.serves === undefined
                          ? "no serving ☹️"
                          : "👤".repeat(recipe.serves)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </ScrollArea>
    </div>
  );
};

export default RecipeList;
