import { getPageContent } from "../../../services/getPageContent";
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

// const Dog = async ({
//   params,
// }: {
//   params: { category: string; dog: string };
// }) => {
//   const dog = await getDogBySlug(params.dog);

//   if (!dog) return <Typography variant="h4">Hittade inte hunden</Typography>;

//   return (
//     <Box>
//       <Typography variant="h2">{dog.name}</Typography>
//       {dog.image && (
//         <img src={`https:${dog.image.fields.file.url}`} alt={dog.name} />
//       )}
//       <Typography>{documentToReactComponents(dog.description)}</Typography>
//     </Box>
//   );
// const pageData = (await getPageContent("dogCategory", slug)) as any;

// if (!pageData) {
//   return <Typography variant="h1">Contact Info content not found</Typography>;
// }

// const { title, description, heroImage } = pageData;
// const imageUrl = heroImage?.fields?.file?.url
//   ? `https:${heroImage.fields.file.url}`
//   : null;

// return (
//   <Suspense fallback={<LoadingData />}>
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         minHeight: "100vh",
//         p: 3,
//       }}>
//       <Typography
//         variant="h2"
//         component="h2"
//         gutterBottom
//         sx={{
//           textAlign: "center",
//           mb: 3,
//           fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
//           animation: "fadeIn 2s",
//         }}>
//         {title}
//       </Typography>
//       {imageUrl && (
//         <CardMedia
//           component="img"
//           alt={heroImage.title}
//           image={imageUrl}
//           sx={{
//             width: { xs: "90%", sm: "80%", md: "70%", lg: "60%", xl: "50%" },
//             height: "auto",
//             mb: 3,
//             boxShadow: 3,
//             borderRadius: 2,
//             animation: "zoomIn 2s",
//           }}
//         />
//       )}
//       <Typography
//         variant="body1"
//         color="textSecondary"
//         align="center"
//         sx={{ maxWidth: 800, mb: 3 }}>
//         {documentToReactComponents(description)}
//       </Typography>
//     </Box>
//   </Suspense>
// );
// };

// export default Dog;
