import { Box, Typography, Grid } from "@mui/material";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import LoadingData from "../../../components/getLoadingPage";
import { Suspense } from "react";
import Image from "next/image";
import { extractImages, getDogBySlug } from "@/app/services/helpers";
import { Dog } from "@app/types";

interface dogAncestorTree {
  ancestor: {
    children: string;
  };
  level: number;
  fields: {
    name: string;
    color: string;
    relationType: string;
  };
  color: string;
  children?: dogAncestorTree[];
}

const renderRelation = (relationType: string, ancestors: any[]) => {
  const filteredAncestors = ancestors.filter(
    (ancestor) => ancestor.fields.relationType === relationType
  );

  return filteredAncestors.map((ancestor, index) => (
    <Box
      key={index}
      sx={{
        backgroundColor: ancestor.fields.color || "#f5f5f5",
        padding: 2,
        borderRadius: 2,
        border: "1px solid #ccc",
        textAlign: "center",
        minWidth: 200,
        margin: 1,
      }}>
      <Typography variant="subtitle2" fontWeight="bold">
        {ancestor.fields.relationType}
      </Typography>
      <Typography>{ancestor.fields.name}</Typography>
    </Box>
  ));
};

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

  if (!dog) {
    console.error("No dog found for slug:", slug);
    return <Typography component={"h2"}>Hunden kunde inte hittas</Typography>;
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
        <Typography variant="h2">
          {dog.name ? dog.name : "Namn saknas"}
        </Typography>
        <Typography variant="h2">{dog.birthdate}</Typography>
        {images.length > 0 ? (
          images.map((url, index) => (
            <Image
              loading="lazy"
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
        <Typography>
          {documentToReactComponents(dog.description as any)}
        </Typography>
      </Box>
      <Box
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
        }}>
        <Typography
          variant="h2"
          fontWeight="bold"
          gutterBottom
          sx={{
            display: "flex",
            justifyContent: "center",
          }}>
          Stamtavla
        </Typography>

        {dog.dogAncestorTree && dog.dogAncestorTree.length > 0 ? (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}>
              {/* Fader och hans träd */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: 4,
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}>
                {/* Fader */}
                <Grid
                  container
                  spacing={2}
                  sx={{
                    alignItems: "center",
                  }}>
                  <Grid size={3}>
                    {renderRelation("Fader/Sire", dog.dogAncestorTree)}
                  </Grid>

                  {/* Farföräldrar */}
                  <Grid size={3}>
                    {renderRelation(
                      "Farfar/Sire Grandsire",
                      dog.dogAncestorTree
                    )}
                    {renderRelation(
                      "Farmor/Sire Granddam",
                      dog.dogAncestorTree
                    )}
                  </Grid>

                  {/* Farfars föräldrar */}
                  <Grid size={3}>
                    {renderRelation(
                      "Farfars far/Sire Grandsire Father",
                      dog.dogAncestorTree
                    )}
                    {renderRelation(
                      "Farfars mor/Sire Grandsire Mother",
                      dog.dogAncestorTree
                    )}
                  </Grid>

                  {/* Farmors föräldrar */}
                  <Grid size={3}>
                    {renderRelation(
                      "Farmors far/Sire Granddam Father",
                      dog.dogAncestorTree
                    )}
                    {renderRelation(
                      "Farmors mor/Sire Granddam Mother",
                      dog.dogAncestorTree
                    )}
                  </Grid>
                </Grid>
              </Box>

              {/* Moder och hennes träd */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 4,
                  width: "100%",
                }}>
                {/* Moder */}
                <Grid
                  container
                  spacing={3}
                  sx={{
                    alignItems: "center",
                    width: "100%",
                  }}>
                  <Grid size={3}>
                    {renderRelation("Moder/Dam", dog.dogAncestorTree)}
                  </Grid>

                  {/* Morföräldrar */}
                  <Grid size={3}>
                    {renderRelation(
                      "Morfar/Dam Grandsire",
                      dog.dogAncestorTree
                    )}
                    {renderRelation("Mormor/Dam Granddam", dog.dogAncestorTree)}
                  </Grid>

                  {/* Morfars föräldrar */}
                  <Grid size={3}>
                    {renderRelation(
                      "Morfars far/Dam Grandsire Father",
                      dog.dogAncestorTree
                    )}
                    {renderRelation(
                      "Morfars mor/Dam Grandsire Mother",
                      dog.dogAncestorTree
                    )}
                  </Grid>

                  {/* Mormors föräldrar */}
                  <Grid size={3}>
                    {renderRelation(
                      "Mormors far/Dam Granddam Father",
                      dog.dogAncestorTree
                    )}
                    {renderRelation(
                      "Mormors mor/Dam Granddam Mother",
                      dog.dogAncestorTree
                    )}
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </>
        ) : (
          <Typography variant="body1">Ingen stamtavla tillgänglig</Typography>
        )}
      </Box>
    </Suspense>
  );
};

export default DogDetails;
