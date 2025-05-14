import { getPageContent } from "../services/helpers";
import { Box, Typography, CardMedia } from "@mui/material";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import LoadingData from "../components/getLoadingPage";
import { Suspense } from "react";
import type { Document } from "@contentful/rich-text-types";

interface GalleryPageData {
  title: string;
  description: string | Document;
  images?: {
    fields?: {
      file?: {
        url?: string;
      };
      title?: string;
    };
  };
}

const Gallery = async () => {
  const pageData = (await getPageContent("gallery")) as GalleryPageData;

  if (!pageData) {
    return <Typography variant="h1">Gallery content not found</Typography>;
  }

  const { title, description, images } = pageData;
  const imageUrl = images?.fields?.file?.url
    ? `https:${images.fields.file.url}`
    : null;

  return (
    <Suspense fallback={<LoadingData />}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          p: 3,
        }}>
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          sx={{
            textAlign: "center",
            mb: 3,
            fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
            animation: "fadeIn 2s",
          }}>
          {title}
        </Typography>
        {imageUrl && (
          <CardMedia
            component="img"
            alt={images?.fields?.title || title}
            image={imageUrl}
            sx={{
              width: { xs: "90%", sm: "80%", md: "70%", lg: "60%", xl: "50%" },
              height: "auto",
              mb: 3,
              boxShadow: 3,
              borderRadius: 2,
              animation: "zoomIn 2s",
            }}
          />
        )}
        <Typography
          variant="body1"
          color="textSecondary"
          align="center"
          sx={{ maxWidth: 800, mb: 3 }}>
          {description
            ? typeof description === "object"
              ? documentToPlainTextString(description as Document)
              : description
            : ""}
        </Typography>
      </Box>
    </Suspense>
  );
};

export default Gallery;
