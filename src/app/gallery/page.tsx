import { getPageContent, extractImages } from "../services/helpers";
import { Box, Typography, CardMedia } from "@mui/material";
import LoadingData from "../components/getLoadingPage";
import { Suspense } from "react";
interface GalleryPageData {
  title: string;
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

  const { title, images } = pageData;

  const getImages = extractImages(images);

  return (
    <Suspense fallback={<LoadingData />}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
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
            marginTop: "20px",
          }}>
          {title}
        </Typography>
        <Box
          sx={{
            border: "2px solid #ccc",
            borderRadius: "8px",
            backgroundColor: "#f9f9f2",
            width: "100%",
            padding: 4,
          }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr", // 1 per row on mobile
                sm: "1fr 1fr", // 2 per row on small screens
                md: "1fr 1fr 1fr", // 3 per row on medium screens
                lg: "1fr 1fr 1fr 1fr", // 4 per row on large screens
                xl: "1fr 1fr 1fr 1fr 1fr", // 5 per row on extra large screens
              },
              gap: 3,
              width: "100%",
              justifyItems: "center",
              mb: 3,
            }}>
            {getImages && Array.isArray(getImages) && getImages.length > 0 ? (
              getImages.map((imgUrl, idx) => (
                <Box key={imgUrl || idx} sx={{ width: "100%" }}>
                  <CardMedia
                    component="img"
                    alt={images?.fields?.title || title}
                    image={imgUrl}
                    sx={{
                      width: "100%",
                      maxWidth: { xs: 300, sm: 400, md: 500 },
                      maxHeight: 350,
                      height: "auto",
                      boxShadow: 3,
                      borderRadius: 2,
                      objectFit: "cover",
                      margin: "0 auto",
                    }}
                  />
                </Box>
              ))
            ) : getImages ? (
              <Box sx={{ width: "100%" }}>
                <CardMedia
                  component="img"
                  alt={images?.fields?.title || title}
                  image={typeof getImages === "string" ? getImages : ""}
                  sx={{
                    width: "100%",
                    maxWidth: { xs: 300, sm: 400, md: 500 },
                    maxHeight: 350,
                    height: "auto",
                    boxShadow: 3,
                    borderRadius: 2,
                    objectFit: "cover",
                    margin: "0 auto",
                  }}
                />
              </Box>
            ) : null}
          </Box>
        </Box>
      </Box>
    </Suspense>
  );
};

export default Gallery;
