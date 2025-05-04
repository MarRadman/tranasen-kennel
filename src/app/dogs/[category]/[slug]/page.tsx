import { Box, Typography } from "@mui/material";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import LoadingData from "../../../components/getLoadingPage";
import { Suspense } from "react";
import Image from "next/image";
import { extractImages, getDogBySlug } from "@/app/services/helpers";

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

  const dog = (await getDogBySlug(slug)) as {
    name?: string;
    images?: { fields: { file: { url: string } } }[];
    description?: string;
  };

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
          {dog.name ? String(dog.name) : "Namn saknas"}
        </Typography>
        {images.length > 0 ? (
          images.map((url, index) => (
            <Image
              key={index}
              width={500}
              height={500}
              src={url}
              alt={dog.name ? String(dog.name) : `Dog image ${index + 1}`}
            />
          ))
        ) : (
          <p>Inga bilder tillgängliga</p>
        )}
        <div>
          {dog.description
            ? documentToReactComponents(dog.description as any)
            : "Beskrivning saknas"}
        </div>
      </Box>
    </Suspense>
  );
};

export default DogDetails;
