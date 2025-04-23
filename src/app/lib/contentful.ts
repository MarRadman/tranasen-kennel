import { createClient } from "contentful";

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "",
});

export const fetchData = async (
  contentType: string,
  slug?: string,
  category?: string
) => {
  try {
    const query: any = { content_type: contentType, include: 2 };
    if (slug) {
      query["fields.slug"] = slug;
    }
    if (category) {
      query["fields.category"] = category;
    }
    const data = await client.getEntries(query);
    return data.items;
  } catch (error) {
    console.error("Error fetching data from Contentful:", error);
    throw new Error("Failed to fetch data from Contentful");
  }
};
