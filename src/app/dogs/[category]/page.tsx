import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import LoadingData from "../../components/getLoadingPage";
import { Suspense } from "react";
import { getDogsInCategory } from "@/app/services/helpers";
import Link from "next/link";

const DogsCategories = async ({ params }: { params: { category: string } }) => {
  const { category } = await params;

  if (!category) {
    return <Typography component={"h3"}>Kategori kunde inte hittas</Typography>;
  }

  const dogCategories = await getDogsInCategory(category);

  console.log("Dog info: ", dogCategories);

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
        <Typography component={"h2"}>Hundar i denna kategori</Typography>
        <List
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}>
          {dogCategories.map((dog) => (
            <ListItem
              key={dog.slug}
              component={Link}
              href={`/dogs/${category}/${dog.slug}`}
              sx={{
                width: "auto",
              }}>
              <ListItemText primary={dog.name} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Suspense>
  );
};

export default DogsCategories;
