import { fetchData } from "../lib/contentful";

export const getPageContent = async (contentType: string) => {
  try {
    const data = await fetchData(contentType);
    return data[0]?.fields || null;
  } catch (error) {
    console.error("Error fetching page content:", error);
    return null;
  }
};
