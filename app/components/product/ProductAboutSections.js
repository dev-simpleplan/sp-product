"use client";

import { getImageUrl } from "../common/getImageUrl";

function richText(block) {
  return block?.[0]?.children
    ?.map((child) => (child.type === "text" ? child.text : ""))
    .join("");
}

function Arrow() {
  return (
    <span className="arrow-wrap" aria-hidden="true">
      <span className="arrow arrow-1">↗</span>
      <span className="arrow arrow-2">↗</span>
    </span>
  );
}

export function ProductIntro({ id, data }) {
  if (!data) return null;

  return (
    <section className="product-intro" id={id}>
      <div className="container">
        <div className="product-intro__inner gap-left">
          <div>
            <p className="product-eyebrow">{data.tagline}</p>
            <h2>{data.title}</h2>
          </div>
          <div className="product-intro__body">
            <p>{richText(data.description)}</p>
            {data.cta_link && (
              <a className="custom-btn" href={data.cta_link}>
                <span>{data.cta_text}</span>
                <Arrow />
              </a>
            )}
          </div>
        </div>
        {data.stats?.length > 0 && (
          <div className="product-stats gap-left">
            {data.stats.map((stat) => (
              <div className="product-stat" key={stat.id}>
                <strong>{stat.number}</strong>
                <span>{stat.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function ProductDeliverables({ id, data }) {
  if (!data) return null;

  return (
    <section className="product-deliverables" id={id}>
      <div className="container">
        <div className="product-deliverables__heading gap-left">
          <p className="product-eyebrow">{data.tagline}</p>
          <h2>{data.title}</h2>
        </div>
        <div className="product-deliverables__grid gap-left">
          {data.deliverables?.map((item) => (
            <article className="product-deliverable" key={item.id}>
              {item.image && (
                <img src={getImageUrl(item.image)} alt={item.image.alternativeText || item.title} />
              )}
              <div>
                <h3>{item.title}</h3>
                <p>{richText(item.description)}</p>
                {item.cta_link && (
                  <a href={item.cta_link} className="product-text-link">
                    {item.cta_text} <Arrow />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProductFeature({ id, data }) {
  if (!data) return null;

  return (
    <section className="product-feature" id={id}>
      <div className="container">
        <div className="product-feature__inner gap-left">
          <div className="product-feature__copy">
            <p className="product-eyebrow">{data.tagline}</p>
            <h2>{data.title}</h2>
            <p>{richText(data.product_description) || data.text}</p>
            {data.cta_link && (
              <a href={data.cta_link} className="custom-btn">
                <span>{data.cta_text}</span>
                <Arrow />
              </a>
            )}
          </div>
          {data.image && (
            <img src={getImageUrl(data.image)} alt={data.image.alternativeText || data.product_name || "Product"} />
          )}
        </div>
      </div>
    </section>
  );
}

export function ProductBrands({ id, data }) {
  if (!data) return null;
  const logos = Array.isArray(data.image) ? data.image : data.brand_logos ? [data.brand_logos] : [];

  return (
    <section className="product-brands" id={id}>
      <div className="container">
        <div className="product-brands__inner gap-left">
          <p className="product-eyebrow">{data.tagline}</p>
          <p className="product-brands__description">{data.description}</p>
          <div className="product-brands__logos">
            {logos.map((logo) => (
              <img key={logo.id} src={getImageUrl(logo)} alt={logo.alternativeText || logo.name || "Trusted brand"} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
