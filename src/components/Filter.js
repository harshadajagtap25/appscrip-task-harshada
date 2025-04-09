import React, { useEffect, useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import styles from "../styles/Filter.module.css";
import Image from "next/image";

export default function Filter({ handleCallbackFilterOpen }) {
  const {
    categories,
    setFilteredProducts,
    getAllProducts,
    selectedCategories,
    setSelectedCategories,
    isMobile,
  } = useAppContext();

  const [isCategoryExpanded, setIsCategoryExpanded] = useState(false);

  const toggleCategoryExpand = () => {
    setIsCategoryExpanded(!isCategoryExpanded);
  };

  const handleFilter = async (e, category) => {
    let updatedCategories = [];

    if (e.target.checked) {
      updatedCategories = [...selectedCategories, category];
    } else {
      updatedCategories = selectedCategories.filter(
        (item) => item !== category
      );
    }

    setSelectedCategories(updatedCategories);

    if (updatedCategories.length === 0) {
      getAllProducts();

      return;
    }

    // Call API for each category
    const promises = updatedCategories.map((cat) =>
      fetch(`https://fakestoreapi.in/api/products/category?type=${cat}`).then(
        (res) => res.json()
      )
    );

    const response = await Promise.all(promises);

    const mergedProducts = response.flatMap((res) => res.products);
    setFilteredProducts(mergedProducts);
    if (isMobile) {
      handleCallbackFilterOpen();
    }
  };

  useEffect(() => {
    if (isMobile) {
      setIsCategoryExpanded(true);
    }
  }, []);

  const handleUnselectAllCategory = async () => {
    if (selectedCategories.length > 0) {
      setSelectedCategories([]);
      getAllProducts();
    }
    if (isMobile) {
      handleCallbackFilterOpen();
    }
  };
  return (
    <div className={styles.filterMain}>
      <div className={styles.filterItem}>
        <div className={styles.filterTitle}>
          <div> Categories</div>
          {!isMobile && (
            <Image
              src={
                isCategoryExpanded
                  ? "/images/arrow-up.png"
                  : "/images/arrow-down.png"
              }
              alt={isCategoryExpanded ? "arrow-up" : "arrow-down"}
              height={16}
              width={16}
              className={styles.filterTitleArrowImage}
              onClick={toggleCategoryExpand}
            />
          )}
        </div>

        {isCategoryExpanded && (
          <div className={styles.categoryWrapper}>
            <div
              className={`${styles.unselectCategories} ${
                selectedCategories.length > 0 ? styles.activeUnselect : ""
              }`}
              onClick={handleUnselectAllCategory}
            >
              Unselect all
            </div>

            {categories &&
              categories.map((category) => (
                <div key={category} className={styles.categoryItem}>
                  <input
                    type="checkbox"
                    value={category}
                    checked={selectedCategories.includes(category)}
                    onChange={(e) => handleFilter(e, category)}
                    className={styles.categoryCheckbox}
                  />
                  <label className={styles.categoryItemLabel}>{category}</label>
                </div>
              ))}
          </div>
        )}
      </div>

      <div className={styles.filterItemBorder}></div>
    </div>
  );
}
