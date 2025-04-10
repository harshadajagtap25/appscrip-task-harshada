import Head from "next/head";
import HeaderComponent from "../components/Header";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import "../styles/globals.css";
import { ProductListNFilter } from "@/components/ProductListNFilter";
import { useAppContext } from "@/contexts/AppContext";
import { FooterComponent } from "@/components/Footer";

export async function getServerSideProps({ res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=600, stale-while-revalidate=59"
  );

  try {
    const [categoryRes, productRes] = await Promise.all([
      fetch("https://fakestoreapi.in/api/products/category"),
      fetch("https://fakestoreapi.in/api/products"),
    ]);

    if (!categoryRes.ok || !productRes.ok) {
      throw new Error("Failed to fetch data");
    }

    if (!categoryRes.ok || !productRes.ok) {
      throw new Error("Failed to fetch data");
    }

    const categoriesJson = await categoryRes.json();
    const apiCategories = categoriesJson["categories"] || [];

    const productJson = await productRes.json();
    const products = productJson["products"] || [];

    return {
      props: {
        products,
        apiCategories,
        error: "Failed to load data. Please try again later.",
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

export default function Home({ products, apiCategories }) {
  const { setFilteredProducts, setCategories, setIsMobile } = useAppContext();

  useEffect(() => {
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
        <link rel="icon" href="/brandLogo.png" type="image/png" />

        <meta
          name="description"
          content="Buy best products online at best price"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph tags */}
        <meta property="og:title" content="Discover our products" />
        <meta
          property="og:description"
          content="Buy best products online at best price"
        />
        <meta
          property="og:image"
          content="http://localhost:3000/brandLogo.png"
        />
        <meta property="og:url" content="http://localhost:3000" />
        <meta property="og:type" content="website" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Discover our products" />
        <meta
          name="twitter:description"
          content="Buy best products online at best price"
        />
        <meta
          name="twitter:image"
          content="http://localhost:3000/brandLogo.png"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Appsrip-task",
              url: "http://localhost:3000",
            }),
          }}
        />
      </Head>

      <main className={styles.main}>
        <HeaderComponent />
        <ProductListNFilter />
        <FooterComponent />
      </main>
    </>
  );
}
