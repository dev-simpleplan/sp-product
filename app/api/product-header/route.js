// app/api/product-header/route.js

export async function GET() {
  try {
    const res = await fetch(
      "http://72.61.235.119:1337/api/product-header?populate[logo]=true&populate[header_menu][populate][mega_menu][populate][sub_pages]=true",
      {
        // Only send the header when a token is configured — "Bearer undefined"
        // makes Strapi reject the call with 401 even for public content.
        headers: process.env.STRAPI_TOKEN
          ? { Authorization: `Bearer ${process.env.STRAPI_TOKEN}` }
          : {},
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return Response.json(
        { error: "Failed to fetch from external API" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    console.error("product-header route error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
