import { Box, Typography } from "@mui/material";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import LoadingData from "../../../components/getLoadingPage";
import { Suspense } from "react";
import Image from "next/image";
import { extractImages, getDogBySlug } from "@/app/services/helpers";
import { Dog } from "@app/types";

const renderRelation = (
  relationType: string,
  ancestors: { fields: { relationType: string; color: string; name: string } }[]
) => {
  const filteredAncestors = ancestors.filter(
    (ancestor) => ancestor.fields.relationType === relationType
  );

  return filteredAncestors.map((ancestor, index) => {
    // Definiera färger baserat på hundens färg
    const colorMap: { [key: string]: string } = {
      yellow: "#FFEB3B", // Ljus gul
      brown: "#8B5E3C", // Brun
      black: "#000000", // Svart
    };

    // Översätt färger till svenska
    const colorTranslation: { [key: string]: string } = {
      yellow: "Gul",
      brown: "Brun",
      black: "Svart",
    };

    const backgroundColor =
      colorMap[ancestor.fields.color.toLowerCase()] || "#f5f5f5"; // Standardfärg om ingen matchning
    const textColor = backgroundColor === "#000000" ? "#fff" : "#000"; // Vit text för svart bakgrund, annars svart text

    // Lägg till en etikett för färgen på svenska
    const colorLabel =
      colorTranslation[ancestor.fields.color.toLowerCase()] || "Okänd färg";

    return (
      <Box
        key={index}
        sx={{
          backgroundColor: backgroundColor,
          padding: 2,
          borderRadius: 2,
          border: "1px solid #ccc",
          textAlign: "center",
          minWidth: 200,
          margin: 1,
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)",
        }}>
        <Typography
          component={"span"}
          variant="subtitle2"
          fontWeight="bold"
          sx={{ color: textColor }}>
          {ancestor.fields.relationType}
        </Typography>
        <Typography sx={{ color: textColor }}>
          {ancestor.fields.name}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: textColor,
            fontStyle: "italic",
            marginTop: 1,
            display: "block",
          }}>
          Färg/Color: {colorLabel}
        </Typography>
      </Box>
    );
  });
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
          textAlign: "center",
          padding: 3,
        }}>
        <Typography sx={{ marginTop: "2%" }} variant="h2">
          {dog.name ? dog.name : "Namn saknas"}
        </Typography>
        <Box
          sx={{
            width: "25%",
            height: "2px",
            backgroundColor: "#8B5E3C",
            margin: "16px auto",
          }}></Box>
        <Typography variant="h2">{dog.birthdate}</Typography>
        <Typography>
          {documentToReactComponents(dog.description as any)}
        </Typography>
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
      </Box>
      {dog.dogAncestorTree && dog.dogAncestorTree.length > 0 ? (
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
          <Box
            sx={{
              border: "2px solid #ccc",
              borderRadius: "8px",
              padding: 3,
              marginBottom: 4,
              backgroundColor: "#f9f9f9",
            }}>
            {/* Fader och hans träd */}
            <Box
              sx={{
                border: "2px solid #ccc",
                borderRadius: "8px",
                padding: 3,
                marginBottom: 4,
                backgroundColor: "#f9f9f2",
              }}>
              <Typography
                variant="h3"
                fontWeight="bold"
                gutterBottom
                sx={{
                  textAlign: "center",
                }}>
                Faderns träd
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: {
                    xs: "column",
                    md: "row",
                  },
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 2,
                  marginTop: 4,
                  width: "100%",
                }}>
                {/* Fader */}
                <Box
                  sx={{
                    textAlign: "center",
                    minWidth: 200,
                    maxWidth: 300,
                  }}>
                  {renderRelation("Fader/Sire", dog.dogAncestorTree)}
                </Box>

                {/* Farföräldrar */}
                <Box
                  sx={{
                    textAlign: "center",
                    minWidth: 200,
                    maxWidth: 300,
                  }}>
                  {renderRelation("Farfar/Sire Grandsire", dog.dogAncestorTree)}
                  {renderRelation("Farmor/Sire Granddam", dog.dogAncestorTree)}
                </Box>

                {/* Farfars föräldrar */}
                <Box
                  sx={{
                    textAlign: "center",
                    minWidth: 200,
                    maxWidth: 300,
                  }}>
                  {renderRelation(
                    "Farfars far/Sire Grandsire Father",
                    dog.dogAncestorTree
                  )}
                  {renderRelation(
                    "Farfars mor/Sire Grandsire Mother",
                    dog.dogAncestorTree
                  )}
                  {/* Farmors föräldrar */}
                  {renderRelation(
                    "Farmors far/Sire Granddam Father",
                    dog.dogAncestorTree
                  )}
                  {renderRelation(
                    "Farmors mor/Sire Granddam Mother",
                    dog.dogAncestorTree
                  )}
                </Box>
              </Box>
            </Box>

            {/* Moder och hennes träd */}
            <Box
              sx={{
                border: "2px solid #ccc",
                borderRadius: "8px",
                padding: 3,
                marginBottom: 4,
                backgroundColor: "#f9f9f9",
              }}>
              <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
                sx={{
                  textAlign: "center",
                }}>
                Moderns träd
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: {
                    xs: "column",
                    md: "row",
                  },
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 2,
                  marginTop: 4,
                  width: "100%",
                }}>
                {/* Moder */}
                <Box
                  sx={{
                    textAlign: "center",
                    minWidth: 200,
                    maxWidth: 300,
                  }}>
                  {renderRelation("Moder/Dam", dog.dogAncestorTree)}
                </Box>

                {/* Morföräldrar */}
                <Box
                  sx={{
                    textAlign: "center",
                    minWidth: 200,
                    maxWidth: 300,
                  }}>
                  {renderRelation("Morfar/Dam Grandsire", dog.dogAncestorTree)}
                  {renderRelation("Mormor/Dam Granddam", dog.dogAncestorTree)}
                </Box>

                {/* Morfars föräldrar */}
                <Box
                  sx={{
                    textAlign: "center",
                    minWidth: 200,
                    maxWidth: 300,
                  }}>
                  {renderRelation(
                    "Morfars far/Dam Grandsire Father",
                    dog.dogAncestorTree
                  )}
                  {renderRelation(
                    "Morfars mor/Dam Grandsire Mother",
                    dog.dogAncestorTree
                  )}
                  {/* Mormors föräldrar */}
                  {renderRelation(
                    "Mormors far/Dam Granddam Father",
                    dog.dogAncestorTree
                  )}
                  {renderRelation(
                    "Mormors mor/Dam Granddam Mother",
                    dog.dogAncestorTree
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : null}
    </Suspense>
  );
};

export default DogDetails;
