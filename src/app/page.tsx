import { getPageContent } from "./services/helpers";
import { Box, Typography, CardMedia } from "@mui/material";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import LoadingData from "./components/getLoadingPage";
import { Suspense } from "react";
import Link from "next/link";
// import { getVisitorCounter } from "@app/services/getVisitorCounter";

const FrontPage = async () => {
  const pageData = (await getPageContent("frontpage")) as any;
  // const visitorCounter = (await getVisitorCounter()) as number;

  if (!pageData) {
    return <Typography variant="h1">Homepage content not found</Typography>;
  }

  const { description, heroImage } = pageData;
  const imageUrl = Array.isArray(heroImage) ? heroImage[0] : heroImage;

  const imageUrlImage = heroImage?.fields?.file?.url
    ? `https:${heroImage.fields.file.url}`
    : (null as any);

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
        <Link href="/homepage">
          <CardMedia
            component="img"
            alt={imageUrl.title}
            image={imageUrlImage}
            sx={{
              mb: 3,
              boxShadow: 3,
              borderRadius: 2,
            }}
          />
        </Link>
        <Typography
          variant="body1"
          color="textSecondary"
          align="center"
          sx={{ maxWidth: 800, mb: 3 }}>
          {plainDescription as any}
        </Typography>
      </Box>
    </Suspense>
  );
};

export default FrontPage;
