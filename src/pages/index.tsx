import ProductList from "@/components/ProductList";
import RecipeList from "@/components/RecipeList";
import WithToken from "@/components/WithToken";

const Home = () => {
  return (
    <WithToken>
      <div className="bg-gray-200 relative flex flex-col items-center justify-center m-8 h-60">
        <h1>Welcome to your Fridge!</h1>
        <div className="absolute bottom-0 m-4">
          Some sort and filter options here
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8 mx-8">
        <div className="flex flex-col p-8 border-solid border-2 border-gray-400 rounded-md">
          <h1 className="text-lg font-bold">Fridge List</h1>
          <ProductList />
        </div>
        <div className="flex flex-col p-8 border-solid border-2 border-gray-400 rounded-md">
          <RecipeList />
        </div>
      </div>
    </WithToken>
  );
};

export default Home;
