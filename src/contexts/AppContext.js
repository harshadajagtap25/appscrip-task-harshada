import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedSortingOption, setSelectedSortingOption] =
    useState("RECOMMENDED");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const handleProductSorting = (sortOption) => {
    const sortedProducts = [...filteredProducts];

    // If products array is empty or not an array, return it as is
    if (!Array.isArray(sortedProducts) || sortedProducts.length === 0) {
      return sortedProducts;
    }

    switch (sortOption.toLowerCase()) {
      case "popular":
        // Sort popular items first
        // Items with popular:true come first, then sort by other criteria as fallback
        return sortedProducts.sort((a, b) => {
          // Handle case where 'popular' key might be missing
          const aIsPopular = a.popular === true;
          const bIsPopular = b.popular === true;

          if (aIsPopular && !bIsPopular) return -1; // a comes first
          if (!aIsPopular && bIsPopular) return 1; // b comes first

          // If both have same popularity status, sort by price as secondary criteria
          return a.price - b.price;
        });

      case "price: high to low":
        // Sort by price in descending order
        return sortedProducts.sort((a, b) => {
          // Handle case where price might be missing or not a number
          const aPrice = typeof a.price === "number" ? a.price : 0;
          const bPrice = typeof b.price === "number" ? b.price : 0;

          return bPrice - aPrice;
        });

      case "price: low to high":
        // Sort by price in ascending order
        return sortedProducts.sort((a, b) => {
          // Handle case where price might be missing or not a number
          const aPrice = typeof a.price === "number" ? a.price : 0;
          const bPrice = typeof b.price === "number" ? b.price : 0;

          return aPrice - bPrice;
        });

      case "recommended":
      default:
        // Return products in their original order (as they came from API)
        // Note: since we made a copy above, we need to sort by ID to restore original order
        return sortedProducts.sort((a, b) => {
          // Handle case where id might be missing
          const aId = a.id || 0;
          const bId = b.id || 0;

          return aId - bId;
        });
    }
  };

  const getAllProducts = async () => {
    const productRes = await fetch(
      "https://fakestoreapi.in/api/products?limit=149"
    );
    const productJson = await productRes.json();
    const products = productJson["products"];

    setFilteredProducts(products);
  };

  return (
    <AppContext.Provider
      value={{
        isFilterVisible,
        setIsFilterVisible,
        filteredProducts,
        setFilteredProducts,
        categories,
        setCategories,
        selectedSortingOption,
        setSelectedSortingOption,
        handleProductSorting,
        getAllProducts,
        selectedCategories,
        setSelectedCategories,
        isMobile,
        setIsMobile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
