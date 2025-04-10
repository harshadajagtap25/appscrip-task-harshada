import Image from "next/image";
import styles from "../styles/ProductListNFilterWrapper.module.css";
import { useState } from "react";
import { useAppContext } from "@/contexts/AppContext";

export default function ProductCard({ product }) {
  const { isMobile } = useAppContext();

  const [isFavorite, setIsFavorite] = useState(false);

  const productNameUpdate = (name) => {
    return name.length > 25 ? name.slice(0, 25) + "..." : name;
  };

  const toggleFavorite = (e) => {
    // Prevent the click from affecting parent elements
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };
  return (
    <div className={styles.card}>
      <img
        src={product.image}
        alt={product.title}
        className={styles.productImage}
      />
      <div className={styles.productInfoNFav}>
        <div className={styles.productInfo}>
          <h2 className={styles.productTitle}>
            {productNameUpdate(product.title)}
          </h2>
          <p className={styles.productSignText}>
            Sign in or Create an account to see pricing
          </p>
        </div>
        <div className={styles.favouriteBox}>
          <Image
            src={
              isFavorite
                ? "/images/favourite_filled.png"
                : "/images/favourite_outline.png"
            }
            alt="favourite"
            height={isMobile ? 16 : 24}
            width={isMobile ? 16 : 24}
            onClick={toggleFavorite}
            className={styles.favoriteIcon}
          />
        </div>
      </div>
    </div>
  );
}
