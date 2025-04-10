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
  const [isDataLoading, setIsDataLoading] = useState(true);

  const handleProductSorting = (sortOption) => {
    const sortedProducts = [...filteredProducts];

    if (!Array.isArray(sortedProducts) || sortedProducts.length === 0) {
      return sortedProducts;
    }

    switch (sortOption.toLowerCase()) {
      case "popular":
        return sortedProducts.sort((a, b) => {
          const aIsPopular = a.popular === true;
          const bIsPopular = b.popular === true;

          if (aIsPopular && !bIsPopular) return -1;
          if (!aIsPopular && bIsPopular) return 1;
          return a.price - b.price;
        });

      case "price: high to low":
        return sortedProducts.sort((a, b) => {
          const aPrice = typeof a.price === "number" ? a.price : 0;
          const bPrice = typeof b.price === "number" ? b.price : 0;

          return bPrice - aPrice;
        });

      case "price: low to high":
        return sortedProducts.sort((a, b) => {
          const aPrice = typeof a.price === "number" ? a.price : 0;
          const bPrice = typeof b.price === "number" ? b.price : 0;

          return aPrice - bPrice;
        });

      case "recommended":
      default:
        return sortedProducts.sort((a, b) => {
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
        isDataLoading,
        setIsDataLoading,
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
