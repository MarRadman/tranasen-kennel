import { fetchData } from "@/app/lib/contentful";

export const getDogCategories = async () => {
  const data = await fetchData("dogCategory");
  return data.map((item: any) => ({
    title: item.fields.title,
    slug: item.fields.slug,
  }));
};
