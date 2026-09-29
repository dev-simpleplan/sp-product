const PRODUCTS_HOME_API =
  "http://72.61.235.119:1337/api/products-homepage?populate[product_home_banner][populate]=*&populate[stats][populate]=*&populate[bestselling_products][populate][products_type][populate][products][populate]=*";

export async function GET() {
  try {
    const response = await fetch(PRODUCTS_HOME_API, { cache: "no-store" });

    if (!response.ok) {
      return Response.json(
        { error: "Failed to fetch product home content" },
        { status: response.status }
      );
    }

    return Response.json(await response.json());
  } catch (error) {
    console.error("products-homepage route error:", error);
    return Response.json(
      { error: "Unable to load product home banner" },
      { status: 500 }
    );
  }
}
