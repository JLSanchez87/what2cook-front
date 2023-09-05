import ProductList from "@/components/ProductList";
import RecipeList from "@/components/RecipeList";
import WithToken from "@/components/WithToken";

const Home = () => {
  return (
    <WithToken>
      <div className="relative flex flex-col items-center justify-center w-full mx-8 mb-8 bg-center bg-cover -t-4 h-80 rounded-b-2xl bg-landing">
        <h1>Welcome to your Fridge!</h1>
        <div className="absolute bottom-0 m-4">
          Some sort and filter options here
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col p-8 border-2 border-gray-400 border-solid rounded-md">
          <h1 className="text-lg font-bold">Fridge List</h1>
          <ProductList />
        </div>
        <div className="flex flex-col p-8 border-2 border-gray-400 border-solid rounded-md">
          <RecipeList />
        </div>
      </div>
    </WithToken>
  );
};

export default Home;
