import { Box, Typography } from "@mui/material";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
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
  params: Promise<{ category: string; slug: string }>;
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
          {dog.description
            ? (documentToPlainTextString(dog.description) as string)
            : ""}
        </Typography>
        {images.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              width: "100%",
            }}>
            {/* First Image */}
            <Box
              sx={{
                width: "100%",
                maxWidth: "700px",
                position: "relative",
                overflow: "hidden",
                borderRadius: "8px",
              }}>
              <Image
                src={images[0]}
                alt={dog.name ? dog.name : `Dog image 1`}
                width={700}
                height={500}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "auto",
                }}
              />
            </Box>

            {/* Grid for Remaining Images */}
            {images.length > 1 && (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr", // Single column on small screens
                    sm: "repeat(2, 1fr)", // Two columns on small screens
                    md: "repeat(3, 1fr)", // Three columns on medium screens and above
                  },
                  gap: 2,
                  width: "100%",
                  maxWidth: "700px",
                }}>
                {images.slice(1).map((url, index) => (
                  <Box
                    key={index}
                    sx={{
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: "8px",
                    }}>
                    <Image
                      src={url}
                      alt={dog.name ? dog.name : `Dog image ${index + 2}`}
                      width={200}
                      height={200}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "auto",
                      }}
                    />
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        ) : (
          <p>Inga bilder tillgängliga</p>
        )}
      </Box>
      {dog.dogAncestorTree && dog.dogAncestorTree.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}>
          <Box
            sx={{
              padding: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
            }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                border: "2px solid #ccc",
                borderRadius: "8px",
                padding: 3,
                marginBottom: 4,
                backgroundColor: "#f9f9f9",
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
                    {renderRelation(
                      "Farfar/Sire Grandsire",
                      dog.dogAncestorTree
                    )}
                    {renderRelation(
                      "Farmor/Sire Granddam",
                      dog.dogAncestorTree
                    )}
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
                    {renderRelation(
                      "Morfar/Dam Grandsire",
                      dog.dogAncestorTree
                    )}
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
        </Box>
      ) : null}
    </Suspense>
  );
};

export default DogDetails;
