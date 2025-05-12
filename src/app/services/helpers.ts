import { fetchData } from "../lib/contentful";

//-------------------------//-------------------------//------------------------
//Dog helpers

// Fetch all Dog Categories
export const getDogCategories = async () => {
  const data = await fetchData("dogCategory");
  return data.map((item: any) => ({
    title: item.fields.title,
    slug: item.fields.slug,
  }));
};

// Fetch Dog Categories like Male/female/puppy
export const getDogsInCategory = async (slug: string) => {
  const categories = await fetchData("dogCategory", slug);
  const category = categories[0];
  const dogs = Array.isArray(category?.fields?.dogs)
    ? category.fields.dogs
    : [];

  return dogs.map((dog: any) => ({
    name: dog.fields.name,
    slug: dog.fields.slug,
    images: extractImages(dog.fields.image), // Use extractImages here
  }));
};

// Fetch the dog with the right slug
export const getDogBySlug = async (slug: string) => {
  const dogs = await fetchData("dog", slug);
  return dogs[0]?.fields || null;
};

//-------------------------//-------------------------//------------------------
//Helpers to extract images, text etc..

// Extract Images from object
export const extractImages = (imagesField: unknown): string[] => {
  if (Array.isArray(imagesField)) {
    return imagesField
      .filter(
        (image): image is { fields: { file: { url: string } } } =>
          image?.fields?.file?.url
      )
      .map((image) => {
        const url = image.fields.file.url;
        return url.startsWith("//") ? `https:${url}` : url;
      });
  } else if (
    typeof imagesField === "object" &&
    imagesField?.fields?.file?.url
  ) {
    const url = imagesField.fields.file.url;
    return [url.startsWith("//") ? `https:${url}` : url];
  }
  return [];
};

// Fetch Page Content
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

// Fetch all news
export const getAllNews = async () => {
  const data = await fetchData("newsList");
  return data.map((item: any) => ({
    title: item.fields.title,
    slug: item.fields.slug,
    news: item.fields.news,
  }));
};
