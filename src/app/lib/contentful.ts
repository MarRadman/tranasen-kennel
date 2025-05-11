"use server";
import { createClient } from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "",
});

export const fetchData = async (
  contentType: string,
  slug?: string,
  category?: string
) => {
  const query: any = { content_type: contentType, include: 2 };
  if (slug) query["fields.slug"] = slug;
  if (category) query["fields.category.sys.id"] = category;

  const data = await client.getEntries(query);
  return data.items;
};
