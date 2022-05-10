import { createTheme, responsiveFontSizes } from "@mui/material";
declare module "@mui/material/styles" {
  interface Palette {
    disabled: string;
    home: {
      main: string;
      background: string;
    };
    slider: {
      primary: string;
      secondary: string;
      backgroundPri: string;
      backgroundSec: string;
    };
  }
  interface PaletteOptions {
    disabled: string;
    home: {
      main: string;
      background: string;
    };
    slider: {
      primary: string;
      secondary: string;
      backgroundPri: string;
      backgroundSec: string;
    };
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    disabled: true;
    home: {
      main: true;
      background: true;
    };
    slider: {
      primary: string;
      secondary: string;
      backgroundPri: string;
      backgroundSec: string;
    };
  }
}

export const theme = responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily: ["'degular', 'sans-serif'"].join(","),
      fontSize: 20,
      h1: {
        // letterSpacing: 0,
        // fontSize: 50,
        fontFamily: ["'bely', 'sans-serif'"].join(","),
        fontWeight: 600,
      },
      h2: {
        // fontSize: 40,
        fontFamily: ["'bely', 'sans-serif'"].join(","),
        fontWeight: 600,
      },
      h3: {
        // fontSize: 30,
        fontFamily: ["'bely', 'sans-serif'"].join(","),
        fontWeight: 600,
      },
      h4: {
        // fontSize: 25,
        fontFamily: ["'bely', 'sans-serif'"].join(","),
        fontWeight: 600,
      },
      h5: {
        // fontSize: 20,
        fontFamily: ["'bely', 'sans-serif'"].join(","),
        fontWeight: 600,
        fontSize: 15,
      },
      h6: {
        fontFamily: ["'bely', 'sans-serif'"].join(","),
        fontWeight: 600,
        fontSize: 25,
      },
      body2: {
        // fontSize: 13,
      },
      subtitle1: {
        fontSize: 11,
      },
    },
    components: {
      MuiFilledInput: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            backgroundColor: "#F3EFFA",
            ":hover": {
              backgroundColor: "#F3EFFA",
            },
            ":before": {
              display: "none",
            },
            ":after": {
              display: "none",
            },
          },
          input: {
            backgroundColor: "#F3EFFA",
            borderRadius: 12,
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            /* borderRadius: 12,
                backgroundColor: "#DED1F4",
                ":hover": {
                  backgroundColor: "#DED1F4",
                }, */
            ":before": {
              display: "none",
            },
            ":after": {
              display: "none",
            },
          },
        },
      },
    },

    breakpoints: {
      keys: ["xs", "sm", "md", "lg", "xl"],
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    palette: {
      // palette values for light mode
      primary: {
        main: "#5754D9",
        contrastText: "#FEF8EA",
      },
      secondary: {
        main: "#D179B3",
        contrastText: "#000",
      },
      home: {
        main: "#177DDB",
        background: "#EFF5FA",
      },
      slider: {
        primary: "#DED1F4",
        secondary: "#D1E7F4",
        backgroundPri: "#F3EFFA",
        backgroundSec: "#EFF5FA",
      },

      disabled: "#717171",

      text: {
        primary: "#000000",
        secondary: "#000000",
      },
      info: {
        main: "#DED1F4",
      },
      divider: "transparent",
      background: {
        default: "#FCFCFC",
        paper: "#F3EFFA",
      },
    },
  })
);
