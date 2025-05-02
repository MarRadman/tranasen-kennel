import { fetchData } from "../lib/contentful";

export const getDogsInCategory = async (slug: string) => {
  const categories = await fetchData("dogCategory", slug);
  const category = categories[0];
  const dogs = category.fields.dogs || [];

  return dogs.map((dog: any) => ({
    name: dog.fields.name,
    slug: dog.fields.slug,
    image: dog.fields.image,
  }));
};
