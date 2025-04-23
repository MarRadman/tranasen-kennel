import { getPageContent } from "../components/getPageContent";
import { Box, Typography, CardMedia } from "@mui/material";
// import { HomePageData } from "@/app/types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const HomePage = async () => {
  const pageData = (await getPageContent("homepage")) as any;

  if (!pageData) {
    return <Typography variant="h1">Homepage content not found</Typography>;
  }

  const { description, heroImage } = pageData;
  const imageUrl = Array.isArray(heroImage) ? heroImage[0] : heroImage;

  const imageUrlImage = heroImage?.fields?.file?.url
    ? `https:${heroImage.fields.file.url}`
    : (null as any);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        p: 3,
      }}>
      <CardMedia
        component="img"
        alt={imageUrl.title}
        image={imageUrlImage}
        sx={{
          width: { xs: "90%", sm: "80%", md: "70%", lg: "60%", xl: "50%" },
          height: "auto",
          mb: 3,
          boxShadow: 3,
          borderRadius: 2,
          animation: "zoomIn 2s",
        }}
      />
      <Typography
        variant="body1"
        color="textSecondary"
        align="center"
        sx={{ maxWidth: 800, mb: 3 }}>
        {documentToReactComponents(description)}
      </Typography>
    </Box>
  );
};

export default HomePage;
