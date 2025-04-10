import Image from "next/image";
import React, { useState } from "react";
import styles from "../styles/Filter.module.css";

export default function FilterSection({
  title,
  items,
  selectedItems,
  onFilterChange,
  onUnselectAll,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleUnselect = () => {
    if (onUnselectAll) {
      onUnselectAll();
    }
  };

  return (
    <div className={styles.filterItem}>
      <div className={styles.filterTitle}>
        <div>{title}</div>
        <Image
          src={isExpanded ? "/images/arrow-up.png" : "/images/arrow-down.png"}
          alt={isExpanded ? "arrow-up" : "arrow-down"}
          height={16}
          width={16}
          className={styles.filterTitleArrowImage}
          onClick={toggleExpand}
        />
      </div>

      {isExpanded && (
        <div className={styles.categoryWrapper}>
          <div
            className={`${styles.unselectCategories} ${
              selectedItems.length > 0 ? styles.activeUnselect : ""
            }`}
            onClick={handleUnselect}
          >
            Unselect All
          </div>

          {items &&
            items.map((item) => (
              <div key={item.value} className={styles.categoryItem}>
                <input
                  type="checkbox"
                  value={item.value}
                  checked={selectedItems.includes(item.value)}
                  onChange={(e) => onFilterChange(e, item.value)}
                  className={styles.categoryCheckbox}
                />
                <label className={styles.categoryItemLabel}>{item.label}</label>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
