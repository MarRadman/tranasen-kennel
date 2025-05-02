import { fetchData } from "@/app/lib/contentful";

export const getPageContent = async (
  contentType: string,
  slug?: string,
  category?: string
) => {
  try {
    const data = await fetchData(contentType, slug, category);

    return data[0]?.fields || null;
  } catch (error) {
    console.error("Error fetching page content:", error);
    return null;
  }
};
