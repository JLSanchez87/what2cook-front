import { Product } from "@/types/Interfaces";
import axios from "axios";
import { useEffect, useState } from "react";
import { z } from "zod";

const addToFridgeValidator = z.object({
  productId: z.array(z.number().int()),
});

type DataAddToFridgeForm = z.infer<typeof addToFridgeValidator>;

const ProductList = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [token, setToken] = useState<null | string>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // Get token from localStorage
  useEffect(() => {
    const tokenFromLs = localStorage.getItem("token");

    if (tokenFromLs) {
      setToken(tokenFromLs);
    }
  }, []);

  // Get and sort the products from the API
  useEffect(() => {
    const getProductsFromApi = async () => {
      const response = await axios.get("http://localhost:3001/products");
      const sortedProducts = response.data.sort((a: Product, b: Product) =>
        a.productname.localeCompare(b.productname)
      );
      setProducts(sortedProducts);
    };
    getProductsFromApi();
  }, []);

  // Post an axios request with the token and the value of the selected item
  const handleFridgeSubmit = async () => {
    await axios.post(
      "http://localhost:3001/fridge",
      {
        productId: selectedIds,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  return (
    <>
      <div>
        <form className="flex flex-row flex-wrap mt-2">
          {products === null ? (
            <p>Loading products...</p>
          ) : (
            products.map((product) => {
              return (
                <div
                  className="mr-2 mb-2 border-solid border-2 border-gray-400 rounded-lg hover:bg-lime-200 active:bg-lime-400"
                  key={product.id}
                >
                  <label htmlFor={product.id.toString()} className="p-2">
                    <input
                      type="checkbox"
                      value={product.id}
                      checked={selectedIds.includes(product.id)}
                      onChange={(event) =>
                        !event.currentTarget.checked
                          ? setSelectedIds(
                              selectedIds.filter((i) => i !== product.id)
                            )
                          : setSelectedIds([...selectedIds, product.id])
                      }
                    />
                    {product.productname}
                  </label>
                </div>
              );
            })
          )}
          <button
            className="hover:bg-cyan-400 active:bg-green-500 sticky bottom-0 border-solid border-2 border-black rounded-t-lg bg-slate-300 p-2 pb-8"
            type="button"
            onClick={handleFridgeSubmit}
          >
            Add to fridge
          </button>
        </form>
      </div>
    </>
  );
};

export default ProductList;
