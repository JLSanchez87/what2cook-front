import WithToken from "@/components/WithToken";

const Home = () => {
  return (
    <WithToken>
      <div className="relative flex flex-col items-center justify-center m-8 h-60">
        <h1>Welcome to your Fridge!</h1>
        <div className="absolute bottom-0 m-4">
          Some sort and filter options here
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8 mx-8">
        <div className="flex flex-col p-8 border-solid border-2 border-gray-400 rounded-md">
          <h1>Fridge List</h1>
          <div>
            <ul className="my-4">
              <li>template item</li>
              <li>template item</li>
              <li>template item</li>
              <li>template item</li>
              <li>template item</li>
              <li>template item</li>
              <li>template item</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col p-8 border-solid border-2 border-gray-400 rounded-md">
          <h1>Recipe List</h1>
          <div className="flex flex-col h-40 bg-gray-400 justify-center items-center my-4">
            <h2>Recipe of the Day!</h2>
          </div>
          <p>other available recipes:</p>
          <div className="mt-4">
            <ul>
              <li>
                <div className="flex flex-row">
                  <img src="https://picsum.photos/100" alt="lorem picsum" />
                  <div className="flex flex-col pl-4 w-100">
                    <span>Recipe name</span>
                    <div className="flex flex-row justify-between">
                      <span>prep time: 30mins</span>
                      <span>servings: 👤👤👤👤</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </WithToken>
  );
};

export default Home;
