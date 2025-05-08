import { getPageContent, extractImages } from "../services/helpers";
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

  // Use extractImages to get the image URLs
  const imageUrls = extractImages(heroImages);

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
          variant="body1"
          color="textSecondary"
          align="center"
          sx={{ maxWidth: 800, mb: 3 }}>
          {documentToReactComponents(description) as any}
        </Typography>
        {imageUrls.map((url, index) => (
          <CardMedia
            key={index}
            component="img"
            alt={`Image ${index + 1}`}
            image={url}
            sx={{
              width: "100%",
              height: "auto",
              mb: 3,
              boxShadow: 3,
              borderRadius: 2,
              animation: "zoomIn 2s",
            }}
          />
        ))}
      </Box>
    </Suspense>
  );
};

export default HomePage;
