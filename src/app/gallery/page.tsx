import { getPageContent } from "../components/getPageContent";
import { Box, Typography, CardMedia } from "@mui/material";
import { HomePageData } from "@/app/types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const gallery = async () => {
  const pageData = (await getPageContent("gallery")) as any;

  // if (!pageData) {
  //   return <Typography variant="h1">Homepage content not found</Typography>;
  // }

  // const { title, content, heroImage } = pageData;
  // const imageUrl = Array.isArray(heroImage) ? heroImage[0] : heroImage;

  // const imageUrlImage = heroImage?.fields?.file?.url
  //   ? `https:${heroImage.fields.file.url}`
  //   : (null as any);

  return <div>Gallery</div>;
};

export default gallery;
