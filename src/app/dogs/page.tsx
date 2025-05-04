import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import LoadingData from "../components/getLoadingPage";
import { Suspense } from "react";
import { getDogCategories } from "../services/helpers";
import Link from "next/link";
import Image from "next/image";

const AllDogCategories = async () => {
  const categories = await getDogCategories();

  if (!categories) {
    return <Typography component={"h3"}>Kategori kunde inte hittas</Typography>;
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
        <Typography variant="h2">Alla Hundkategorier</Typography>
        <Image
          src="/homePageImages/firstHomePageImage.svg"
          alt="Description of the image"
          width={300}
          height={200}
        />
        <List
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}>
          {categories.map((dog) => (
            <ListItem
              key={dog.slug}
              component={Link}
              href={`/dogs/${dog.slug}`}
              sx={{
                width: "auto",
              }}>
              <ListItemText primary={dog.title} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Suspense>
  );
};

export default AllDogCategories;
