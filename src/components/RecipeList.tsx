import { Recipe } from "@/types/Interfaces";
import axios from "axios";
import { useEffect, useState } from "react";

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
            className="flex flex-col h-40 bg-gray-400 justify-center items-center my-4 bg-cover bg-center rounded-2xl"
            style={{ backgroundImage: `url(${randomRecipe.recipeImg})` }}
          >
            <h2 className="text-lg font-bold p-2 bg-green-300 rounded-lg">
              Recipe of the Day!
            </h2>
            <p className="p-2 bg-green-300 rounded-b-lg">
              {randomRecipe.recipename}
            </p>
          </div>
          <p>other available recipes:</p>
        </div>
      )}

      {recipes === null ? (
        <p>Loading recipes..</p>
      ) : (
        recipes.map((recipe) => {
          return (
            <div key={recipe.id}>
              <div key={recipe.id} className="mt-4">
                <ul>
                  <li>
                    <div className="flex flex-row mb-4 rounded-xl border-solid border-2 border-gray-400 drop-shadow-lg">
                      <img
                        className="rounded-xl border-dashed border-2 border-gray-400 w-20 object-cover"
                        src={recipe.recipeImg}
                        alt={recipe.description}
                      />
                      <div className="flex flex-col p-4 w-full">
                        <span>{recipe.recipename}</span>
                        <div className="flex flex-row justify-between">
                          <span>prep time: {recipe.prepTime}mins</span>
                          <span>servings: {recipe.serves}</span>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default RecipeList;
