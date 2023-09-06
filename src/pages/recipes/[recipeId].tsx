import Wrapper from "@/components/Wrapper";
import { ProductOnRecipe, Recipe } from "@/types/Interfaces";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Recipe = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const router = useRouter();
  const recipeIdFromUrl = router.query.recipeId;

  useEffect(() => {
    if (recipeIdFromUrl === undefined) {
      return;
    }

    const getRecipeFromApi = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/${recipeIdFromUrl}`
        );
        setRecipe(response.data);
      } catch (error) {
        console.log("Error fetching recipe:", error);
      }
    };
    getRecipeFromApi();
  }, [recipeIdFromUrl]);

  if (recipe === null) {
    return <p>Loading recipe, please wait...</p>;
  }

  return (
    <Wrapper>
      <div key={recipe.id}>
        <img src={recipe.recipeImg} />
        <div>
          <span>{recipe.recipename}</span>
          <span>{recipe.description}</span>
          <div>
            <span>{recipe.prepTime}</span>
            <span>{recipe.serves}</span>
          </div>
          <div>
            <div>{recipe.instructions}</div>
            <div>Ingredients</div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Recipe;
