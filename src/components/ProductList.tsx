import { Product } from "@/types/Interfaces";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { motion, useScroll } from "framer-motion";

// const addToFridgeValidator = z.object({
//   productId: z.array(z.number().int()),
// });

// type DataAddToFridgeForm = z.infer<typeof addToFridgeValidator>;

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.015,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: "0px" },
  show: { opacity: 1, x: "0px" },
};

const ProductList = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [token, setToken] = useState<null | string>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const router = useRouter();

  // Handle changes in the search input
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filter products based on the search query
    if (products === null) {
      return;
    } else {
      const filteredItems = products.filter((product) =>
        product.productname.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filteredItems);
    }
  };

  // Initialize filteredProducts with products when they are fetched
  useEffect(() => {
    if (products) {
      setFilteredProducts(products);
    }
  }, [products]);

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

      if (sortedProducts) {
        setFilteredProducts(sortedProducts);
      }

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
          <div className="flex flex-row flex-wrap mt-4 mb-10 around">
            <div className="w-full mb-4">
              <input
                type="text"
                placeholder="Search by product name"
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="w-full p-2 border rounded border-header"
              />
            </div>

            {/* Non-Selected Items Column */}
            <div className="w-1/2 p-4 pr-2 border-2 border-r-0 border-cta rounded-l-xl">
              <p className="mb-4">Items in your fridge:</p>
              {filteredProducts.length === 0 ? (
                <p>No matching products found...</p>
              ) : (
                <motion.div
                  className="flex flex-row flex-wrap w-full"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  {filteredProducts.map((product, index) => {
                    if (!selectedIds.includes(product.id)) {
                      return (
                        <motion.div
                          whileHover={{
                            scale: 1.1,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 17,
                          }}
                          whileTap={{ scale: 0.95 }}
                          variants={itemVariants}
                          key={index}
                          className="relative items-start px-2 mb-2 mr-2 border-2 border-solid border-cta rounded-xl"
                        >
                          <label
                            htmlFor={product.id.toString()}
                            key={product.id}
                          >
                            <input
                              className="absolute left-0 w-10 h-6 appearance-none -z-10 checked:bg-gradient-to-r from-fg to-bg-transparent checked:border-none rounded-l-xl"
                              type="checkbox"
                              id={product.id.toString()}
                              value={product.id}
                              checked={true}
                              onChange={(event) =>
                                setSelectedIds(
                                  selectedIds.filter((i) => i !== product.id)
                                )
                              }
                            />
                            {product.productname}
                          </label>
                        </motion.div>
                      );
                    }
                    return null; // Skip non-selected items
                  })}
                </motion.div>
              )}
            </div>

            {/* Non-Selected Items Column */}
            <div className="w-1/2 p-4 pl-2 border-2 border-l-0 border-cta bg-fg rounded-r-xl">
              <p className="mb-4">Add these items:</p>
              {filteredProducts.length === 0 ? (
                <p>No matching products found...</p>
              ) : (
                <motion.div
                  className="flex flex-row flex-wrap w-full"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  {filteredProducts.map((product, index) => {
                    if (!selectedIds.includes(product.id)) {
                      return (
                        <motion.div
                          whileHover={{
                            scale: 1.1,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 17,
                          }}
                          whileTap={{ scale: 0.95 }}
                          variants={itemVariants}
                          key={index}
                          className="relative items-start px-2 mb-2 mr-2 border-2 border-solid border-cta rounded-xl bg-bg"
                        >
                          <label htmlFor={product.id.toString()}>
                            <input
                              className="absolute left-0 w-10 h-6 appearance-none max-w-content -z-10 checked:bg-gradient-to-r from-fg to-bg-transparent checked:border-none rounded-l-xl active:scale-95"
                              type="checkbox"
                              id={product.id.toString()}
                              value={product.id}
                              checked={false} // Non-selected items should not be checked
                              onChange={(event) =>
                                setSelectedIds([...selectedIds, product.id])
                              }
                            />
                            {product.productname}
                          </label>
                        </motion.div>
                      );
                    }
                    return null; // Skip selected items
                  })}
                </motion.div>
              )}
            </div>
          </div>
          <div className="w-100">
            <button
              className="fixed bottom-0 p-2 pb-8 transition ease-in-out border-2 border-solid rounded-t-lg border-cta bg-header text-cta active:bg-cta active:text-fg active:scale-105 w-60 hover:-translate-y-1 hover:scale-110 hover:bg-fg hover:text-cta"
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
