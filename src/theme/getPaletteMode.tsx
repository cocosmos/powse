import { PaletteMode } from "@mui/material";
import { grey } from "@mui/material/colors";

const getPaletteMode = (mode: PaletteMode) => ({
  palette: {
    mode: mode,
    typography: {
      fontFamily: ["Inter", "serif"].join(","),
    },
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            main: "#5754D9",
            contrastText: "#FEF8EA",
          },
          secondary: {
            main: "#787878",
            contrastText: "#000",
            background: "#F3EFFA",
          },
          neutral: {
            main: "#2d2d2d",
            contrastText: "#363636",
          },
          text: {
            primary: "#000000",
            secondary: "#000000",
          },

          divider: "transparent",
          background: {
            default: "#FCFCFC",
            paper: "#08090a",
          },
          /*  mainWindow: {
            background: "#FCFCFC",
          }, */
        }
      : {
          // palette values for dark mode
          /* common: {
            white: "#fff",
            black: "#000",
          }, */
          primary: {
            main: "#020077",
            contrastText: "#FEF8EA",
          },
          secondary: {
            main: "#787878",
            contrastText: "#000",
            background: "#F3EFFA",
          },
          neutral: {
            main: "#2d2d2d",
            contrastText: "#363636",
          },
          text: {
            primary: "#000000",
            secondary: "#000000",
          },

          divider: "transparent",
          /* background: {
            default: "#FCFCFC",
            paper: "#08090a",
          }, */
          /*  mainWindow: {
            background: "#FCFCFC",
          }, */
        }),
  },
});

export default getPaletteMode;
