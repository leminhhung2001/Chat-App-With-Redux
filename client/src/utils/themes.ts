import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0d47a1",
    },
    secondary: {
      main: "#689f38",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#29b6f6",
    },
    secondary: {
      main: "#689f38",
    },
    background: {
      paper: "#212121",
      default: "#000",
    },
    contrastThreshold: 5,
  },
});
