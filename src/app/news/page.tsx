import { getPageContent } from "../components/getPageContent";
import { Box, Typography, CardMedia } from "@mui/material";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const news = async () => {
  const pageData = (await getPageContent("news")) as any;

  if (!pageData) {
    return <Typography variant="h1">Contact Info content not found</Typography>;
  }

  const { title, description, heroImage } = pageData;
  const imageUrl = heroImage?.fields?.file?.url
    ? `https:${heroImage.fields.file.url}`
    : null;

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
          alt={heroImage.title}
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
        {documentToReactComponents(description)}
      </Typography>
    </Box>
  );
};

export default news;
