import { createClient } from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "",
});

export const fetchData = async (contentType: string) => {
  try {
    const response = await client.getEntries({
      content_type: contentType,
    });
    return response.items;
  } catch (error) {
    console.error("Error fetching data from Contentful:", error);
    return [];
  }
};
