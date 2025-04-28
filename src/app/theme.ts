import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#8B5E3C", // Brun som huvudfärg
    },
    secondary: {
      main: "#8B5E3C", // Ljus beige som sekundärfärg
    },
    background: {
      default: "#FAF0E6", // Linen - supermjuk ljusbrun/beige
    },

    text: {
      primary: "#3E2C23", // Nästan svart brun för text
      secondary: "#7B5E57", // Ljusare brun för sekundärtext
    },
  },
  typography: {
    fontFamily: "Montserrat, Arial, sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      color: "#8B5E3C",
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
      color: "#8B5E3C",
      [`@media (min-width:600px)`]: {
        fontSize: "2rem",
      },
      [`@media (min-width:960px)`]: {
        fontSize: "2.5rem",
      },
    },
    h5: {
      color: "#8B5E3C",
    },
    h6: {
      fontSize: "1.25rem",
      fontWeight: "bold",
      color: "#8B5E3C",
      [`@media (min-width:600px)`]: {
        fontSize: "1.5rem",
      },
      [`@media (min-width:960px)`]: {
        fontSize: "1.75rem",
      },
    },
    body1: {
      fontSize: "1rem",
      color: "#3E2C23",
      [`@media (min-width:600px)`]: {
        fontSize: "1.25rem",
      },
      [`@media (min-width:960px)`]: {
        fontSize: "1.5rem",
      },
    },
    body2: {
      fontSize: "0.875rem",
      color: "#7B5E57",
      [`@media (min-width:600px)`]: {
        fontSize: "1rem",
      },
      [`@media (min-width:960px)`]: {
        fontSize: "1.125rem",
      },
    },
    subtitle1: {
      fontSize: "1.125rem",
      color: "#3E2C23",
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
          "&::-webkit-scrollbar": {
            display: "none",
          },
          backgroundColor: "#FAF0E6",
          fontFamily: "Montserrat, Arial, sans-serif",
        },
        ".navmenu": {
          textDecoration: "none",
          "& a": {
            color: "#8B5E3C",
            textDecoration: "none",
          },
          "& button": {
            backgroundColor: "#8B5E3C",
            color: "#FFFFFF",
            borderRadius: 10,
            "&:hover": {
              backgroundColor: "#6A452E",
            },
          },
        },
        img: {
          marginTop: "5%",
          width: "100%",
          height: "auto",
          maxWidth: "1000px",
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
          backgroundColor: "#3E2C23",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#2A1E18",
          },
        },
      },
    },
  },
});

export default theme;
