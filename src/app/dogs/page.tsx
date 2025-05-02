import { getPageContent } from "@/app/services/getPageContent";
import { Box, Typography, CardMedia } from "@mui/material";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import LoadingData from "../components/getLoadingPage";
import { Suspense } from "react";
import Link from "next/link";
import { getDogCategories } from "../services/getDogCategories";

const Dogs = async () => {
  const categories = await getDogCategories();

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
        <Typography variant="h2">Alla Hundkategorier</Typography>
        <ul>
          {categories.map((dog) => (
            <li key={dog.slug}>
              <Link href={`/dogs/${dog.slug}`}>{dog.title}</Link>
            </li>
          ))}
        </ul>
      </Box>
    </Suspense>
  );
};

export default Dogs;
