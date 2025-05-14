import { getPageContent, extractImages } from "../services/helpers";
import { Box, Typography, CardMedia, Paper } from "@mui/material";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import LoadingData from "../components/getLoadingPage";
import { Suspense } from "react";
import { HomePageData } from "@app/types";

const HomePage = async () => {
  const pageData = await getPageContent<
    HomePageData & { description: string; heroImages: unknown }
  >("homepage");

  if (!pageData) {
    return <Typography variant="h1">Homepage content not found</Typography>;
  }

  const { description, heroImages } = pageData;

  const imageUrls = extractImages(heroImages);

  const plainDescription = documentToPlainTextString(description);

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
        <Paper
          elevation={3}
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            maxWidth: 800,
            width: "100%",
            marginTop: "5%",
          }}>
          <Typography
            variant="body1"
            color="textSecondary"
            align="center"
            sx={{ maxWidth: 800 }}>
            {plainDescription}
          </Typography>
        </Paper>
        {imageUrls.map((url, index) => (
          <CardMedia
            key={index}
            component="img"
            alt={`Image ${index + 1}`}
            image={url}
            sx={{
              width: "100%",
              height: "auto",
              boxShadow: 3,
              borderRadius: 2,
            }}
          />
        ))}
      </Box>
    </Suspense>
  );
};

export default HomePage;
