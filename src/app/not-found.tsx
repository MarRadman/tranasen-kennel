import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";

const errorHandler = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}>
      <Typography variant="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h6" gutterBottom>
        Sorry, the page you are looking for does not exist.
      </Typography>
      <Button variant="contained" color="primary" component={Link} href="/">
        Go to Home
      </Button>
    </Box>
  );
};

export default errorHandler;
