import { fetchData } from "../lib/contentful";
import { Dog, DogImage, NewsList, ContentfulEntry } from "../types";

// Fetch all Dog Categories
export const getDogCategories = async (): Promise<
  { title: string; slug: string }[]
> => {
  const data = await fetchData("dogCategory");
  return data.map((item: { fields?: { title?: string; slug?: string } }) => ({
    title: item.fields?.title ?? "",
    slug: item.fields?.slug ?? "",
  }));
};

// Fetch Dog Categories like Male/female/puppy
export const getDogsInCategory = async (
  slug: string
): Promise<{ name: string; slug: string; images: string[] }[]> => {
  const categories = await fetchData("dogCategory", slug);
  const category = categories[0] as ContentfulEntry<{
    dogs: ContentfulEntry<Dog>[];
  }>;
  const dogs = Array.isArray(category?.fields?.dogs)
    ? category.fields.dogs
    : [];

  return dogs.map((dog: ContentfulEntry<Dog>) => ({
    name: dog.fields.name ?? "",
    slug: dog.fields.slug ?? "",
    images: extractImages(dog.fields.images),
  }));
};

// Fetch the dog with the right slug
export const getDogBySlug = async (slug: string): Promise<Dog | null> => {
  const dogs = await fetchData("dog", slug);
  return dogs[0]?.fields ?? null;
};

// Extract Images from object
export const extractImages = (imagesField: unknown): string[] => {
  if (Array.isArray(imagesField)) {
    return imagesField
      .filter((image): image is DogImage => !!image?.fields?.file?.url)
      .map((image) => {
        const url = image.fields.file.url;
        return url.startsWith("//") ? `https:${url}` : url;
      });
  } else if (
    typeof imagesField === "object" &&
    imagesField &&
    (imagesField as DogImage).fields?.file?.url
  ) {
    const url = (imagesField as DogImage).fields.file.url;
    return [url.startsWith("//") ? `https:${url}` : url];
  }
  return [];
};

// Fetch Page Content
export const getPageContent = async <T>(
  contentType: string,
  slug?: string,
  category?: string
): Promise<T | null> => {
  try {
    const data = await fetchData(contentType, slug, category);
    return data[0]?.fields ?? null;
  } catch (error) {
    console.error("Error fetching page content:", error);
    return null;
  }
};

// Fetch all news
export const getAllNews = async (): Promise<NewsList[]> => {
  const data = await fetchData("newsList");
  return data.map((item: ContentfulEntry<NewsList>) => ({
    title: item.fields.title,
    slug: item.fields.slug,
    news: item.fields.news,
  }));
};
