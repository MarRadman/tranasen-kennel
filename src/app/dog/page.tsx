import { getPageContent } from "../components/getPageContent";
import { Box, Typography, CardMedia } from "@mui/material";
import { HomePageData } from "@/app/types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const dog = async () => {
  const pageData = (await getPageContent("dog")) as any;

  // if (!pageData) {
  //   return <Typography variant="h1">Homepage content not found</Typography>;
  // }

  // const { title, content, heroImage } = pageData;
  // const imageUrl = Array.isArray(heroImage) ? heroImage[0] : heroImage;

  // const imageUrlImage = heroImage?.fields?.file?.url
  //   ? `https:${heroImage.fields.file.url}`
  //   : (null as any);

  return <div>Dog</div>;
};

export default dog;
