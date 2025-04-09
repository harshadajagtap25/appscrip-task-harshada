import Head from "next/head";
import HeaderComponent from "../components/Header";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import "../styles/globals.css";
import { ProductListNFilter } from "@/components/ProductListNFilter";
import { useAppContext } from "@/contexts/AppContext";
import { FooterComponent } from "@/components/Footer";

export async function getServerSideProps() {
  try {
    const categoryRes = await fetch(
      "https://fakestoreapi.in/api/products/category"
    );
    const categoriesJson = await categoryRes.json();
    const apiCategories = categoriesJson["categories"];

    const productRes = await fetch("https://fakestoreapi.in/api/products");
    const productJson = await productRes.json();
    const products = productJson["products"];

    return {
      props: {
        products,
        apiCategories,
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      props: {
        products: [],
        apiCategories: [],
      },
    };
  }
}
function extractFilters(products) {
  const filters = {
    brand: new Set(),
    model: new Set(),
    color: new Set(),
  };

  products.forEach((product) => {
    if (product.brand) filters.brand.add(product.brand);
    if (product.model) filters.model.add(product.model);
    if (product.color) filters.color.add(product.color);
  });

  // Convert Sets to Arrays for easier rendering
  let filterationArray = {
    brand: Array.from(filters.brand),
    model: Array.from(filters.model),
    color: Array.from(filters.color),
  };
  // console.log("fil", filterationArray);
}

export default function Home({ products, apiCategories }) {
  const { setFilteredProducts, setCategories, setIsMobile } = useAppContext();

  useEffect(() => {
    extractFilters(products);

    setFilteredProducts(products);
    setCategories(apiCategories);

    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();

    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return (
    <>
      <Head>
        <title>Discover our products</title>
        <meta
          name="description"
          content="Buy best products online at best price"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className={styles.main}>
        <HeaderComponent />
        <ProductListNFilter />
        <FooterComponent />
      </main>
    </>
  );
}
