import { Product } from "@/types/Interfaces";
import axios from "axios";
import { useRouter } from "next/router";
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
  const router = useRouter();

  // Get and sort the products from the API
  useEffect(() => {
    // Get token for localStorage
    const tokenFromLs = localStorage.getItem("token");

    if (tokenFromLs) {
      setToken(tokenFromLs);
    }

    const getProductsFromApi = async () => {
      const productsResponse = await axios.get(
        "http://localhost:3001/products"
      );
      const userFridgeResponse = await axios.get("http://localhost:3001/me", {
        headers: {
          Authorization: `Bearer ${tokenFromLs}`,
        },
      });

      const sortedProducts = productsResponse.data.sort(
        (a: Product, b: Product) => a.productname.localeCompare(b.productname)
      );

      setProducts(sortedProducts);

      // Get a list of ID's of the items in the users fridge
      const initialSelectedIds = userFridgeResponse.data.Fridge.map(
        (item: any) => {
          return item.productId;
        }
      );

      setSelectedIds(initialSelectedIds);
    };

    getProductsFromApi();
  }, []);

  useEffect(() => {
    if (products) {
      const sortedProducts = [...products]; // Create a copy of the products array
      sortedProducts.sort((a, b) => {
        const isASelected = selectedIds.includes(a.id);
        const isBSelected = selectedIds.includes(b.id);

        // Sort by checked state
        if (isASelected && !isBSelected) {
          return -1; // a comes before b
        } else if (!isASelected && isBSelected) {
          return 1; // b comes before a
        }

        // If both are selected or both are not selected, maintain their original order
        return 0;
      });

      // Update the state with the sorted array
      setProducts(sortedProducts);
    }
  }, [selectedIds]);

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
    router.push("/");
    window.location.href = "/";
  };

  return (
    <>
      <div>
        <form>
          <div className="flex flex-row flex-wrap mt-2 mb-10">
            {products === null ? (
              <p>Loading products...</p>
            ) : (
              products.map((product) => {
                return (
                  <div
                    className="mr-2 mb-2 border-solid border-2 border-gray-400 rounded-lg hover:bg-lime-200 active:bg-lime-400 p-1"
                    key={product.id}
                  >
                    <label htmlFor={product.id.toString()}>
                      <input
                        type="checkbox"
                        id={product.id.toString()}
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
          </div>
          <div className="w-100">
            <button
              className="hover:bg-cyan-400 active:bg-green-500 fixed bottom-0 border-solid border-2 border-black rounded-t-lg bg-slate-300 p-2 pb-8 w-60"
              type="button"
              onClick={handleFridgeSubmit}
            >
              Save Fridge
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductList;
