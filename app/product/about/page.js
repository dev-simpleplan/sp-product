"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import CompanyBanner from "../../components/CompanyBanner";
import HowWeDoIt from "../../components/company/HowWeDoIt";
import RightSideLine from "../../components/RightSideLine";
import Wayfinding from "../../components/Wayfinding";
import { useSetPreFooter } from "../../context/PreFooterContext";
import {
  ProductBrands,
  ProductDeliverables,
  ProductFeature,
  ProductIntro,
} from "../../components/product/ProductAboutSections";

export default function ProductAbout() {
  const [sections, setSections] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useSetPreFooter(sections.pre_footer);

  useEffect(() => {
    axios
      .get("/api/product-about-us")
      .then(({ data }) => setSections(data?.data || {}))
      .catch((requestError) => {
        console.error("Product About Us fetch error:", requestError);
        setError(requestError);
      })
      .finally(() => setLoading(false));
  }, []);

  const wayfindingSections = [
    { id: "product-about-hero", label: "About" },
    { id: "product-about-intro", label: sections.about_product?.tagline || "Story" },
    { id: "product-about-standards", label: sections.how_created_products?.tagline || "Standards" },
    { id: "product-about-deliverables", label: sections.our_products_cover?.tagline || "Deliverables" },
    { id: "product-about-feature", label: sections.build_real_products?.tagline || "Featured" },
    { id: "product-about-brands", label: sections.trusted_brands?.tagline || "Benefits" },
  ];

  if (error) {
    return <div className="product-page-error">Unable to load the product About Us page.</div>;
  }

  return (
    <>
      <Wayfinding sections={wayfindingSections} />
      <RightSideLine id="rightLine" />
      <CompanyBanner id="product-about-hero" data={sections.product_about_banner} loading={loading} />
      <ProductIntro id="product-about-intro" data={sections.about_product} />
      <HowWeDoIt id="product-about-standards" data={sections.how_created_products} />
      <ProductDeliverables id="product-about-deliverables" data={sections.our_products_cover} />
      <ProductFeature id="product-about-feature" data={sections.build_real_products} />
      <ProductBrands id="product-about-brands" data={sections.trusted_brands} />
      {loading && <div className="loading product-page-loading"><span>LOADING</span></div>}
    </>
  );
}
