import { getPageContent } from "../services/getPageContent";
import { Box, Typography, CardMedia } from "@mui/material";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import LoadingData from "../components/getLoadingPage";
import { Suspense } from "react";

const HomePage = async () => {
  const pageData = (await getPageContent("homepage")) as any;

  if (!pageData) {
    return <Typography variant="h1">Homepage content not found</Typography>;
  }

  const { description, heroImages } = pageData;
  const imageUrl = heroImages?.fields?.file?.url
    ? `https:${heroImages.fields.file.url}`
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
        {heroImages?.map((image: any, index: number) => {
          const imageUrl = image?.fields?.file?.url
            ? `https:${image.fields.file.url}`
            : null;

          return (
            imageUrl && (
              <CardMedia
                key={index}
                component="img"
                alt={image.fields.title || `Image ${index + 1}`}
                image={imageUrl}
                sx={{
                  width: "100%",
                  height: "auto",
                  mb: 3,
                  boxShadow: 3,
                  borderRadius: 2,
                  animation: "zoomIn 2s",
                }}
              />
            )
          );
        })}
        <Typography
          variant="body1"
          color="textSecondary"
          align="center"
          sx={{ maxWidth: 800, mb: 3 }}>
          {documentToReactComponents(description)}
        </Typography>
      </Box>
    </Suspense>
  );
};

export default HomePage;
