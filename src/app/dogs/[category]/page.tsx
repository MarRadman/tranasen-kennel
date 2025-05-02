import { getPageContent } from "../../services/getPageContent";
import { Box, Typography, CardMedia } from "@mui/material";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import LoadingData from "../../components/getLoadingPage";
import { Suspense } from "react";
import { getDogsInCategory } from "@/app/services/getDogsInCategory";
import Link from "next/link";

const DogsCategorys = async ({ params }: { params: { category: string } }) => {
  const dogs = await getDogsInCategory(params.category);

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
        <h2>Hundar i denna kategori</h2>
        <ul>
          {dogs.map((dog) => (
            <li key={dog.slug}>
              <Link href={`/dogs/${params.category}/${dog.slug}`}>
                {dog.name}
              </Link>
            </li>
          ))}
        </ul>
      </Box>
    </Suspense>
  );
};

export default DogsCategorys;
