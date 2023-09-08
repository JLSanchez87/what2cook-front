import Wrapper from "@/components/Wrapper";
import { Recipe } from "@/types/Interfaces";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

interface Ingredient {
  id: number;
  product: {
    id: number;
    productname: string;
    portionSize: number;
  };
}

const Recipe = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  // const [product, setProduct] = useState<Product[] | null>(null);
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

  // useEffect(() => {
  //   const getProductFromApi = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3001/products");
  //       setProduct(response.data);
  //     } catch (error) {
  //       console.log("Error fetching recipe:", error);
  //     }
  //   };
  //   getProductFromApi();
  // }, []);

  if (recipe === null) {
    return <p>Loading recipe, please wait...</p>;
  }

  return (
    <Wrapper>
      <div key={recipe.id}>
        <div className="flex flex-row flex-wrap items-end justify-between mt-10 mb-4">
          <div>
            <span className="text-4xl underline font-lobster">
              {recipe.recipename}
            </span>
            <br />
            {recipe.category.map((category) => (
              <Badge className="w-auto" variant={"default"}>
                {category.categoryname}
              </Badge>
            ))}
          </div>
          <div>
            <span className="mr-8">
              Time to cook: {recipe.prepTime} minutes
            </span>
            <span>
              Serves:
              {recipe.serves === undefined
                ? "no serving ☹️"
                : "👤".repeat(recipe.serves)}
            </span>
          </div>
        </div>
        <p>{recipe.description}</p>
        <img
          className="mx-auto my-4 border-4 border-dashed w-100 border-header rounded-3xl md:w-2/3"
          src={recipe.recipeImg}
        />
        <div>
          <div className="grid grid-cols-1 m-auto md:grid-cols-3 md:w-2/3">
            <div className="col-span-2 pr-2">
              <p className="mb-4 font-lobster">Instructions</p>
              <p className="mb-4">{recipe.instructions}</p>
            </div>
            <div className="pl-2 border-t-2 md:border-l-2 md:border-t-0 border-header">
              <p className="mb-4 font-lobster">Ingredients</p>
              <ul>
                {recipe.ingredients.map((ingredient) => (
                  <li key={ingredient.id}>{ingredient.product.productname}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Recipe;
