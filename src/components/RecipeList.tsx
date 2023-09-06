import { Recipe } from "@/types/Interfaces";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

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
          "http://localhost:3001/compare-products",
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
          "http://localhost:3001/recipes"
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
        const response = await axios.get("http://localhost:3001/recipe/random");
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
            className="flex flex-col items-center justify-center h-40 my-4 bg-center bg-cover bg-header rounded-2xl"
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
      <ScrollArea className="w-full p-4 overflow-auto border rounded-2xl bg-bg hover:overflow-scroll">
        <ul className="flex flex-row flex-nowrap">
          {recipes === null ? (
            <p>Loading recipes..</p>
          ) : (
            recipes.map((recipe) => {
              return (
                <li key={recipe.id} className="w-[400px] mb-4 mr-4">
                  <Link href={`recipes/${recipe.id}`}>
                    <div className="flex flex-row border-2 border-solid border-header rounded-xl drop-shadow-lg">
                      <img
                        className="object-cover object-center w-20 h-20 border-2 border-dashed border-header rounded-xl"
                        src={recipe.recipeImg}
                        alt={recipe.description}
                      />
                      <div className="flex flex-col w-full p-4 text-cta">
                        <span className="font-bold">{recipe.recipename}</span>
                        <div className="flex flex-row justify-between">
                          <span>prep⏲: {recipe.prepTime}mins</span>
                          <span>
                            {recipe.serves === undefined
                              ? "no serving ☹️"
                              : "👤".repeat(recipe.serves)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })
          )}
        </ul>
      </ScrollArea>
    </div>
  );
};

export default RecipeList;
