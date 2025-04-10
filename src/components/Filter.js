import React, { useEffect, useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import styles from "../styles/Filter.module.css";
import Image from "next/image";
import FilterSection from "./FilterSection";

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

  const [customizable, setCustomizable] = useState([]);
  const [selectedIdealFor, setSelectedIdealFor] = useState([]);
  const [selectedOccasion, setSelectedOccasion] = useState([]);
  const [selectedWork, setSelectedWork] = useState([]);
  const [selectedFabric, setSelectedFabric] = useState([]);
  const [selectedSegment, setSelectedSegment] = useState([]);
  const [selectedRawMaterials, setSelectedRawMaterials] = useState([]);
  const [selectedPattern, setSelectedPattern] = useState([]);

  // Static filter data
  const idealForItems = [
    { value: "men", label: "Men" },
    { value: "women", label: "Women" },
    { value: "baby_kids", label: "Baby & Kids" },
  ];

  const occasionItems = [
    { value: "rainy_season", label: "Rainy Season" },
    { value: "casual", label: "Casual" },
    { value: "wedding", label: "Wedding" },
    { value: "party", label: "Party" },
    { value: "regular", label: "Regular" },
  ];

  const workItems = [
    { value: "french_knot", label: "French Knot" },
    { value: "zardosi", label: "Zardosi" },
    { value: "fancy", label: "Fancy" },
    { value: "embroidery", label: "Embroidery" },
  ];

  const fabricItems = [
    { value: "muslin", label: "Muslin" },
    { value: "satin_blend", label: "Satin Blend" },
    { value: "satin", label: "Satin" },
    { value: "tericoat", label: "Tericoat" },
    { value: "linen", label: "Linen" },
    { value: "raw_silk", label: "Raw Silk" },
    { value: "cotton", label: "Cotton" },
    { value: "silk", label: "Silk" },
    { value: "cotton_silk", label: "Cotton Silk" },
  ];

  const segmentItems = [
    { value: "silver", label: "Silver" },
    { value: "ethnic", label: "Ethnic" },
    { value: "contemporary", label: "Contemporary" },
  ];

  const rawMaterialsItems = [
    { value: "wool", label: "Wool" },
    { value: "silk", label: "Silk" },
    { value: "leather", label: "Leather" },
    { value: "cotton", label: "Cotton" },
    { value: "cellulosic_fibers", label: "Cellulosic Fibers" },
  ];

  const patternItems = [
    { value: "windowpane", label: "Windowpane" },
    { value: "pinstripes", label: "Pinstripes" },
    { value: "solid", label: "Solid" },
    { value: "chalk_stripes", label: "Chalk Stripes" },
    { value: "slim_fit", label: "Slim Fit" },
    { value: "tartan", label: "Tartan" },
  ];

  const createFilterHandler = (selectedState, setSelectedState) => {
    return (e, value) => {
      if (e.target.checked) {
        setSelectedState([...selectedState, value]);
      } else {
        setSelectedState(selectedState.filter((item) => item !== value));
      }
    };
  };

  const createUnselectHandler = (setStateFunction) => {
    return () => setStateFunction([]);
  };

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

      {/* Static filters */}
      <FilterSection
        title="IDEAL FOR"
        items={idealForItems}
        selectedItems={selectedIdealFor}
        onFilterChange={createFilterHandler(
          selectedIdealFor,
          setSelectedIdealFor
        )}
        onUnselectAll={createUnselectHandler(setSelectedIdealFor)}
      />

      <div className={styles.filterItemBorder}></div>
      <FilterSection
        title="OCCASION"
        items={occasionItems}
        selectedItems={selectedOccasion}
        onFilterChange={createFilterHandler(
          selectedOccasion,
          setSelectedOccasion
        )}
        onUnselectAll={createUnselectHandler(setSelectedOccasion)}
      />

      <div className={styles.filterItemBorder}></div>

      <FilterSection
        title="WORK"
        items={workItems}
        selectedItems={selectedWork}
        onFilterChange={createFilterHandler(selectedWork, setSelectedWork)}
        onUnselectAll={createUnselectHandler(setSelectedWork)}
      />

      <div className={styles.filterItemBorder}></div>

      <FilterSection
        title="FABRIC"
        items={fabricItems}
        selectedItems={selectedFabric}
        onFilterChange={createFilterHandler(selectedFabric, setSelectedFabric)}
        onUnselectAll={createUnselectHandler(setSelectedFabric)}
      />

      <div className={styles.filterItemBorder}></div>

      <FilterSection
        title="SEGMENT"
        items={segmentItems}
        selectedItems={selectedSegment}
        onFilterChange={createFilterHandler(
          selectedSegment,
          setSelectedSegment
        )}
        onUnselectAll={createUnselectHandler(setSelectedSegment)}
      />

      <div className={styles.filterItemBorder}></div>

      <FilterSection
        title="RAW MATERIALS"
        items={rawMaterialsItems}
        selectedItems={selectedRawMaterials}
        onFilterChange={createFilterHandler(
          selectedRawMaterials,
          setSelectedRawMaterials
        )}
        onUnselectAll={createUnselectHandler(setSelectedRawMaterials)}
      />

      <div className={styles.filterItemBorder}></div>

      <FilterSection
        title="PATTERN"
        items={patternItems}
        selectedItems={selectedPattern}
        onFilterChange={createFilterHandler(
          selectedPattern,
          setSelectedPattern
        )}
        onUnselectAll={createUnselectHandler(setSelectedPattern)}
      />

      <div className={styles.filterItemBorder}></div>
    </div>
  );
}
