import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Filter from "./Filter";
import ProductCard from "./ProductCard";
import styles from "../styles/ProductListNFilterWrapper.module.css";
import { useAppContext } from "@/contexts/AppContext";

export const ProductListNFilter = () => {
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const {
    isFilterVisible,
    setIsFilterVisible,
    filteredProducts,
    setFilteredProducts,
    selectedSortingOption,
    setSelectedSortingOption,
    handleProductSorting,
    getAllProducts,
    setSelectedCategories,
    isMobile,
  } = useAppContext();

  const dropdownRef = useRef(null);
  const filterDropdownRef = useRef(null);

  const sortOptions = [
    "RECOMMENDED",
    "POPULAR",
    "PRICE: HIGH TO LOW",
    "PRICE: LOW TO HIGH",
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }

      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target)
      ) {
        setIsFilterDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle functions
  const toggleFilterOpen = () => setIsFilterVisible(!isFilterVisible);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleFilterDropdownOpen = () =>
    setIsFilterDropdownOpen(!isFilterDropdownOpen);
  const handleCallbackFilterOpen = () => {
    setIsFilterDropdownOpen(false);
  };
  const handleOptionSelect = (option) => {
    setSelectedSortingOption(option);
    setIsDropdownOpen(false);

    let sortedArray = handleProductSorting(option);
    setFilteredProducts(sortedArray);
  };

  return (
    <div className={styles.main}>
      {/* Header bar with filter toggle, count and sorting */}
      <div className={styles.mainHeaderBar}>
        {/* Product count and filter visibility toggle */}
        <div className={styles.productCountWrapper}>
          <div className={styles.productCountText}>
            {filteredProducts.length} Items
          </div>

          <div className={styles.filterVisibilityWrapper}>
            <Image
              src={
                isFilterVisible
                  ? "/images/arrow-left.png"
                  : "/images/arrow-right.png"
              }
              alt={isFilterVisible ? "arrow-left" : "arrow-right"}
              height={16}
              width={16}
            />
            <div className={styles.filterText} onClick={toggleFilterOpen}>
              {isFilterVisible ? "Hide Filter" : "Show Filter"}
            </div>
          </div>
        </div>

        {/* Mobile filter dropdown */}
        {isMobile && (
          <div
            className={styles.mobileFilterDropContainer}
            ref={filterDropdownRef}
          >
            <div
              className={styles.productRecommendedWrapper}
              onClick={toggleFilterDropdownOpen}
              tabIndex="0"
              role="button"
              aria-haspopup="listbox"
              aria-expanded={isFilterDropdownOpen}
            >
              <div>FILTER</div>
              <div>
                <Image
                  src={
                    isFilterDropdownOpen
                      ? "/images/arrow-up.png"
                      : "/images/arrow-down.png"
                  }
                  alt={isFilterDropdownOpen ? "arrow-up" : "arrow-down"}
                  height={16}
                  width={16}
                  className={styles.arrowIcon}
                />
              </div>
            </div>

            {isFilterDropdownOpen && (
              <div role="listbox" className={styles.filterDropdown}>
                <Filter handleCallbackFilterOpen={handleCallbackFilterOpen} />
              </div>
            )}
          </div>
        )}

        <div className={styles.verticalLine}></div>

        {/* Sorting dropdown */}
        <div className={styles.sortDropdownContainer} ref={dropdownRef}>
          <div
            className={styles.productRecommendedWrapper}
            onClick={toggleDropdown}
            tabIndex="0"
            role="button"
            aria-haspopup="listbox"
            aria-expanded={isDropdownOpen}
          >
            <div>{selectedSortingOption}</div>
            <div>
              <Image
                src={
                  isDropdownOpen
                    ? "/images/arrow-up.png"
                    : "/images/arrow-down.png"
                }
                alt={isDropdownOpen ? "arrow-up" : "arrow-down"}
                height={16}
                width={16}
                className={styles.arrowIcon}
              />
            </div>
          </div>

          {isDropdownOpen && (
            <div className={styles.dropdownOptions} role="listbox">
              {sortOptions.map((option) => (
                <div
                  key={option}
                  className={`${styles.dropdownOption} ${
                    selectedSortingOption === option ? styles.selected : ""
                  }`}
                  onClick={() => handleOptionSelect(option)}
                  tabIndex="0"
                  role="option"
                  aria-selected={selectedSortingOption === option}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Products and filters container */}
      <div className={styles.filtersNProductListWrapper}>
        {isFilterVisible && (
          <div className={styles.filtersMain}>
            <Filter handleCallbackFilterOpen={handleCallbackFilterOpen} />
          </div>
        )}

        <div
          className={`${styles.productListMain} ${
            isFilterVisible ? styles.withFilter : styles.fullWidth
          }`}
        >
          <div className={styles.productsGrid}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
