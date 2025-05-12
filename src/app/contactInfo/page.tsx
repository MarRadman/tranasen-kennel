import { Box, Typography, Avatar, Link, Paper } from "@mui/material";
import { getPageContent, extractImages } from "@app/services/helpers";

const Contact = async () => {
  const pageData = (await getPageContent("contactInfo")) as any;

  if (!pageData) {
    return <Typography variant="h1">Contact content not found</Typography>;
  }

  const { image, address, email, phone } = pageData;

  const imageUrl = extractImages(image)[0];
  if (!imageUrl) {
    return imageUrl;
  }

  return (
    <Box
      sx={{
        p: 3,
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
        }}>
        <Avatar
          alt="Profile Picture"
          src={imageUrl}
          sx={{ width: 300, height: 300, mb: { xs: 2, md: 0 } }}
        />
        <Paper elevation={3} sx={{ p: 3, flexGrow: 1, maxWidth: 600 }}>
          <Typography variant="h6" gutterBottom>
            Kontakt Information
          </Typography>
          <Typography variant="body1" gutterBottom>
            Adress: {address}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Email:{" "}
            <Link color="secondary" href={`mailto:${email}`}>
              {email}
            </Link>
          </Typography>
          <Typography variant="body1" gutterBottom>
            Tele:{" "}
            <Link color="secondary" href={`tel:${phone}`}>
              {phone}
            </Link>
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}></Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Contact;
