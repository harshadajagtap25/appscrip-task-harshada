import styles from "../styles/ProductListNFilterWrapper.module.css";

export default function ProductCard({ product }) {
  const productNameUpdate = (name) => {
    return name.length > 25 ? name.slice(0, 25) + "..." : name;
  };
  return (
    <div className={styles.card}>
      <img
        src={product.image}
        alt={product.title}
        className={styles.productImage}
      />
      <div className={styles.productInfo}>
        <h2 className={styles.productTitle}>
          {productNameUpdate(product.title)}
        </h2>
        <p className={styles.productSignText}>
          Sign in or Create an account to see pricing
        </p>
      </div>
    </div>
  );
}
