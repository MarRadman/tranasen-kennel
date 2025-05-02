import { fetchData } from "../lib/contentful";

export const getDogBySlug = async (slug: string) => {
  const dogs = await fetchData("dog", slug);
  return dogs[0]?.fields || null;
};
