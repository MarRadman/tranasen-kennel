import { createTheme } from "@mui/material/styles";
import { grey, red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: grey[200], // Primary color (Teal)
    },
    secondary: {
      main: red[300], // Secondary color (Light Grey)
    },
    background: {
      default: grey[100], // Background color (Light Grey)
    },
    text: {
      primary: grey[900], // Primary text color (Dark Grey)
      secondary: grey[600], // Secondary text color (Medium Grey)
    },
  },
  typography: {
    fontFamily: "Montserrat, Arial, sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      color: red[300],
      [`@media (min-width:600px)`]: {
        fontSize: "3rem",
      },
      [`@media (min-width:960px)`]: {
        fontSize: "4rem",
      },
    },
    h2: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: red[300],
      [`@media (min-width:600px)`]: {
        fontSize: "2rem",
      },
      [`@media (min-width:960px)`]: {
        fontSize: "2.5rem",
      },
    },
    h5: {
      color: red[300],
    },
    h6: {
      fontSize: "1.25rem",
      fontWeight: "bold",
      color: red[300],
      [`@media (min-width:600px)`]: {
        fontSize: "1.5rem",
      },
      [`@media (min-width:960px)`]: {
        fontSize: "1.75rem",
      },
    },
    body1: {
      fontSize: "1rem",
      color: grey[900],
      [`@media (min-width:600px)`]: {
        fontSize: "1.25rem",
      },
      [`@media (min-width:960px)`]: {
        fontSize: "1.5rem",
      },
    },
    body2: {
      fontSize: "0.875rem",
      color: grey[600],
      [`@media (min-width:600px)`]: {
        fontSize: "1rem",
      },
      [`@media (min-width:960px)`]: {
        fontSize: "1.125rem",
      },
    },
    subtitle1: {
      fontSize: "1.125rem",
      color: grey[900],
      [`@media (min-width:600px)`]: {
        fontSize: "1.25rem",
      },
      [`@media (min-width:960px)`]: {
        fontSize: "1.375rem",
      },
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: grey[100],
          fontFamily: "Montserrat, Arial, sans-serif",
        },
        ".navmenu": {
          textDecoration: "none",
          "& a": {
            color: red[300],
            textDecoration: "none",
          },
        },
        img: {
          width: "100%",
          height: "auto",
          maxWidth: "500px",
        },
        ".center-content": {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          width: "100%",
        },
        ".footer": {
          marginTop: "auto",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;
