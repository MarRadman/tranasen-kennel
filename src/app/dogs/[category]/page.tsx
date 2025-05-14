import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import LoadingData from "../../components/getLoadingPage";
import { Suspense } from "react";
import { getDogsInCategory } from "@/app/services/helpers";
import Link from "next/link";
import Image from "next/image";

const checkDogCategory = (category: string) => {
  switch (category) {
    case "tik":
      return `Tikar`;
    case "valp":
      return `Valpar`;
    case "hane":
      return `Hanar`;
    case "hundar-vi-minns":
      return "Hundar vi minns";
    default:
      return category;
  }
};

const DogsCategories = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;

  if (!category) {
    return <Typography component={"h3"}>Kategori kunde inte hittas</Typography>;
  }

  const dogCategories = await getDogsInCategory(category);

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
        <Typography variant="h2" component={"h2"}>
          {checkDogCategory(category)}
        </Typography>
        <List
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
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
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}>
              {dog.image && (
                <Image
                  src={dog.image}
                  alt={dog.name}
                  width={100}
                  height={100}
                  style={{
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              )}
              <ListItemText primary={dog.name} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Suspense>
  );
};

export default DogsCategories;
