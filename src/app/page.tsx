import { getPageContent } from "./services/helpers";
import { Box, Typography, CardMedia } from "@mui/material";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import LoadingData from "./components/getLoadingPage";
import { Suspense } from "react";
import Link from "next/link";
import { Document } from "@contentful/rich-text-types";
// import { getVisitorCounter } from "@app/services/getVisitorCounter";

interface HeroImageFields {
  file?: {
    url?: string;
  };
  title?: string;
}

interface PageData {
  description: string;
  image: {
    fields?: HeroImageFields;
    title?: string;
  };
  date: string;
}

const FrontPage = async () => {
  const pageData = (await getPageContent("frontpage")) as PageData | null;
  // const visitorCounter = (await getVisitorCounter()) as number;

  if (!pageData) {
    return <Typography variant="h1">Homepage content not found</Typography>;
  }

  const { description, image, date } = pageData;
  const imageUrl = Array.isArray(image) ? image[0] : image;

  const imageUrlImage: string | undefined = image?.fields?.file?.url
    ? `https:${image.fields.file.url}`
    : undefined;

  let plainDescription: string = "";
  if (description && typeof description === "object") {
    plainDescription = documentToPlainTextString(description as Document);
  } else if (typeof description === "string") {
    plainDescription = description;
  }

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
          {plainDescription}
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          align="center"
          sx={{ maxWidth: 800, mb: 3 }}>
          Uppdaterad: {date}
        </Typography>
      </Box>
    </Suspense>
  );
};

export default FrontPage;
