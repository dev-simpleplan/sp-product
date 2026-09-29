"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ProductHomeBanner from "./components/ProductHomeBanner";
import ProductStats from "./components/ProductStats";
import BestsellingProducts from "./components/BestsellingProducts";
import RightSideLine from "./components/RightSideLine";
import Wayfinding from "./components/Wayfinding";

export default function Home() {
  const [banner, setBanner] = useState(null);
  const [stats, setStats] = useState([]);
  const [bestsellingProducts, setBestsellingProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/api/products-homepage")
      .then(({ data }) => {
        setBanner(data?.data?.product_home_banner || null);
        setStats(data?.data?.stats || []);
        setBestsellingProducts(data?.data?.bestselling_products || null);
      })
      .catch((requestError) => {
        console.error("Product home banner fetch error:", requestError);
        setError(requestError);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="loadingIn">
          <div className="loadingText">
            {"LOADING".split("").map((letter) => (
              <span key={letter} data-text={letter}>
                {letter}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !banner) {
    return <div className="product-home-error">Unable to load the product home banner.</div>;
  }

  return (
    <>
      <Wayfinding
        sections={[
          { id: "product-home-hero", label: banner.tagline || "Intro" },
          ...(stats.length ? [{ id: "product-home-stats", label: "Stats" }] : []),
          ...(bestsellingProducts
            ? [{ id: "product-home-bestsellers", label: bestsellingProducts.tagline || "Bestsellers" }]
            : []),
        ]}
      />
      <RightSideLine id="rightLine" />
      <ProductHomeBanner id="product-home-hero" data={banner} />
      <ProductStats id="product-home-stats" stats={stats} />
      <BestsellingProducts id="product-home-bestsellers" data={bestsellingProducts} />
    </>
  );
}
