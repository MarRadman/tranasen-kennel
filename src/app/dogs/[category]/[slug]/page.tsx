import { Box, Typography, Grid } from "@mui/material";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import LoadingData from "../../../components/getLoadingPage";
import { Suspense } from "react";
import Image from "next/image";
import { extractImages, getDogBySlug } from "@/app/services/helpers";
import { Dog } from "@app/types";

const DogDetails = async ({
  params,
}: {
  params: { category: string; slug: string };
}) => {
  const { slug } = await params;

  if (!slug) {
    console.error("No slug provided in params");
    return <h3>Hunden kunde inte hittas</h3>;
  }

  const dog = (await getDogBySlug(slug)) as Dog;

  console.log("Ancestory tree data: ", dog.dogAncestorTree);

  if (!dog) {
    console.error("No dog found for slug:", slug);
    return <h3>Hunden kunde inte hittas</h3>;
  }

  const images = extractImages(dog.images);

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
        <Typography component={"h2"}>
          {dog.name ? dog.name : "Namn saknas"}
        </Typography>
        <Typography component={"h3"}>{dog.birthdate}</Typography>
        {images.length > 0 ? (
          images.map((url, index) => (
            <Image
              key={index}
              width={500}
              height={500}
              src={url}
              alt={dog.name ? dog.name : `Dog image ${index + 1}`}
            />
          ))
        ) : (
          <p>Inga bilder tillgängliga</p>
        )}
        <div>
          {dog.description
            ? documentToReactComponents(dog.description as Any)
            : "Beskrivning saknas"}
        </div>
      </Box>
      <Box
        sx={{
          marginTop: 4,
          padding: 2,
          border: "1px solid #ccc",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
        }}>
        <Typography
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          variant="h2"
          fontWeight="bold"
          gutterBottom>
          Stamtavla
        </Typography>
        {dog.dogAncestorTree && dog.dogAncestorTree.length > 0 ? (
          dog.dogAncestorTree.map((ancestor, index) => (
            <Grid
              key={index}
              container
              spacing={2}
              sx={{
                marginBottom: 2,
                padding: 2,
                backgroundColor: ancestor.fields.color || "#f9f9f9",
                border: "solid blue 1px",
              }}>
              {ancestor.fields.relationType === "Fader/Sire" && (
                <Grid sx={{ border: "solid red 1px" }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {ancestor.fields.relationType}
                  </Typography>
                  <Typography>{ancestor.fields.name}</Typography>
                  <Typography>{ancestor.fields.color}</Typography>
                  {ancestor.fields.relationType === "Farfar/Sire Grandsire" && (
                    <Grid>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {ancestor.fields.relationType}
                      </Typography>
                      <Typography>{ancestor.fields.name}</Typography>
                      <Typography>{ancestor.fields.color}</Typography>
                    </Grid>
                  )}
                </Grid>
              )}
            </Grid>
          ))
        ) : (
          <Typography>No ancestor data available</Typography>
        )}
      </Box>
    </Suspense>
  );
};

export default DogDetails;
