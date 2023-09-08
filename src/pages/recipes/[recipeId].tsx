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
          `${process.env["NEXT_PUBLIC_API_URL"]}/recipes/${recipeIdFromUrl}`
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
      <div className="mx-2" key={recipe.id}>
        <div className="flex flex-row flex-wrap items-end justify-between mt-10 mb-4 md:mx-auto md:w-2/3">
          <div className="mb-4">
            <span className="text-4xl underline font-lobster">
              {recipe.recipename}
            </span>
            <br />
            {recipe.category.map((category) => (
              <Badge
                key={recipe.id}
                className="w-auto mt-2"
                variant={"default"}
              >
                {category.categoryname}
              </Badge>
            ))}
          </div>
          <div className="flex justify-between w-full mb-4 md:w-auto md:justify-end">
            <span className="md:mr-8">
              Time to cook: {recipe.prepTime} minutes
            </span>
            <span>
              Serves:
              {recipe.serves === undefined
                ? "no serving ☹️"
                : "👤".repeat(recipe.serves)}
            </span>
          </div>
          <p>{recipe.description}</p>
        </div>

        <img
          className="mx-auto my-4 border-2 w-100 border-header rounded-3xl md:w-2/3"
          src={recipe.recipeImg}
          alt={recipe.description}
        />
        <div>
          <div className="grid grid-cols-1 m-auto md:grid-cols-3 md:w-2/3">
            <div className="col-span-2 md:pr-2">
              <p className="mb-4 font-lobster">Do the cooking by the book!</p>
              <p className="mb-4">{recipe.instructions}</p>
            </div>
            <div className="border-t-2 md:pl-2 md:border-l-2 md:border-t-0 border-header">
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
