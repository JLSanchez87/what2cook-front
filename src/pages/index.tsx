import ProductList from "@/components/ProductList";
import RecipeList from "@/components/RecipeList";
import WithToken from "@/components/WithToken";

const Home = () => {
  return (
    <WithToken>
      <div className="flex flex-col items-center justify-center w-full mx-8 mb-8 bg-center bg-cover rounded-b-2xl bg-fg">
        <div className="flex flex-col w-full p-8 border-2 border-t-0 rounded-b-2xl border-header">
          <RecipeList />
        </div>
      </div>
      <div className="w-full">
        <div className="flex flex-col items-center p-8 border-2 border-solid rounded-2xl border-header">
          <h1 className="text-lg font-bold">Your Fridge</h1>
          <ProductList />
        </div>
      </div>
    </WithToken>
  );
};

export default Home;
