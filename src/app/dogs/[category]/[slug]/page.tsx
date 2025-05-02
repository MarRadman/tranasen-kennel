import { Box, Typography, CardMedia } from "@mui/material";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import LoadingData from "../../../components/getLoadingPage";
import { Suspense } from "react";
import { getDogBySlug } from "@/app/services/getDogBySlug";

const DogDetails = async ({ params }: { params: { dog: string } }) => {
  const dog = await getDogBySlug(params.dog);

  if (!dog) return <h3>Hunden kunde inte hittas</h3>;

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
        <h2>{dog.name}</h2>
        {dog.image && (
          <img src={`https:${dog.image.fields.file.url}`} alt={dog.name} />
        )}
        <div>{documentToReactComponents(dog.description)}</div>
      </Box>
    </Suspense>
  );
};

export default DogDetails;
