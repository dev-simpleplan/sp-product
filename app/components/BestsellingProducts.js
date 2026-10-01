"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getImageUrl } from "./getImageUrl";

const ARROW_LEFT = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ARROW_RIGHT = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export default function BestsellingProducts({ id, data }) {
  const categories = useMemo(() => data?.products_type || [], [data]);
  const [activeCategory, setActiveCategory] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const tabsRef = useRef(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const products = useMemo(
    () => categories[activeCategory]?.products || [],
    [activeCategory, categories]
  );

  useEffect(() => {
    const updateVisibleCount = () => {
      const nextVisibleCount =
        window.innerWidth <= 768 ? 1 : window.innerWidth <= 1199 ? 2 : 3;

      setVisibleCount((current) => {
        if (current !== nextVisibleCount) {
          setSlideIndex(0);
        }
        return nextVisibleCount;
      });
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  useEffect(() => {
    const updateIndicator = () => {
      const activeTab = tabsRef.current?.querySelector(".is-active");
      const tabs = tabsRef.current;
      if (!activeTab || !tabs) return;

      setIndicator({
        left: activeTab.offsetLeft,
        width: activeTab.offsetWidth,
      });
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeCategory, categories]);

  if (!data || !categories.length) return null;

  const maxSlideIndex = Math.max(products.length - visibleCount, 0);
  const currentSlideIndex = Math.min(slideIndex, maxSlideIndex);
  const slideOffset = `calc(-${currentSlideIndex * (100 / visibleCount)}% - ${
    currentSlideIndex * (25 / visibleCount)
  }px)`;
  const moveSlide = (direction) => {
    setSlideIndex((current) =>
      Math.max(0, Math.min(current + direction, maxSlideIndex))
    );
  };

  const selectCategory = (index) => {
    setActiveCategory(index);
    setSlideIndex(0);
  };

  return (
    <section className="bestselling-products" id={id}>
      <div className="container">
      <div className="bestselling-products__inner gap-left">
        <h2 className="reveal-heading">{data.title || "Our Bestselling Products"}</h2>

        <div
          className="bestselling-products__tabs"
          ref={tabsRef}
          role="tablist"
          aria-label="Product categories"
        >
          <span
            className="bestselling-products__tab-indicator"
            style={{ left: indicator.left, width: indicator.width }}
            aria-hidden="true"
          />
          {categories.map((category, index) => (
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === index}
              className={activeCategory === index ? "is-active" : ""}
              key={category.id}
              onClick={() => selectCategory(index)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="bestselling-products__viewport">
          <div
            className="bestselling-products__track"
            style={{ transform: `translateX(${slideOffset})` }}
          >
            {products.map((product) => (
              <article className="bestselling-product-card" key={product.id}>
              <div className="bestselling-product-card__image">
                {product.image && (
                  <img
                    src={getImageUrl(product.image)}
                    alt={product.image.alternativeText || product.title || "Product"}
                  />
                )}
              </div>
              <div className="bestselling-product-card__rating">★ {product.rating || "4.9"}</div>
              <h3>{product.title}</h3>
              <p className="bestselling-product-card__price">{product.price}</p>
              <a
                href={product.cta_link && product.cta_link !== "#" ? product.cta_link : "#"}
                className="bestselling-product-card__cta custom-btn"
              >
                <span>{product.cta_text || "View Product"}</span>
                <span className="arrow-wrap" aria-hidden="true">
                  <svg className="arrow arrow-1" viewBox="0 0 12 12" fill="none">
                    <path d="M0.878125 11.6667L0 10.7885L9.53854 1.25H3.75V0H11.6667V7.91667H10.4167V2.12813L0.878125 11.6667Z" fill="currentColor" />
                  </svg>
                  <svg className="arrow arrow-2" viewBox="0 0 12 12" fill="none">
                    <path d="M0.878125 11.6667L0 10.7885L9.53854 1.25H3.75V0H11.6667V7.91667H10.4167V2.12813L0.878125 11.6667Z" fill="currentColor" />
                  </svg>
                </span>
              </a>
              </article>
            ))}
          </div>
        </div>

        {products.length > visibleCount && (
          <div className="bestselling-products__controls">
            <button type="button" onClick={() => moveSlide(-1)} aria-label="Previous products" disabled={currentSlideIndex === 0}>
              {ARROW_LEFT}
            </button>
            <button type="button" onClick={() => moveSlide(1)} aria-label="Next products" disabled={currentSlideIndex === maxSlideIndex}>
              {ARROW_RIGHT}
            </button>
          </div>
        )}
      </div>
      </div>
    </section>
  );
}
