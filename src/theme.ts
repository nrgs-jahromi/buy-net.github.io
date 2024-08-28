import { createTheme } from "@mui/material/styles";

// const getMetaThemeColor = () => {
//   const metaThemeColor = document.querySelector("meta[name='theme-color']");
//   console.log(metaThemeColor?.getAttribute("content") );
  
//   return metaThemeColor ? metaThemeColor.getAttribute("content") : "#455A64";
// };

// const primaryColor = getMetaThemeColor();


const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: {
      main:"#ef4056",
      // main: "#675AE7",
      // #675AE7
      light: "#FFE4E8",
    },
    secondary:{
      main:"#8489D4"
    },
    text: {
      primary: "#455A64",
    },
    background: {
      default: "#F8F9FF",
    },
    grey: {
      50: "#F7F7F7",
      100: "#F5F5F5",
      200: "#E5E5E5",
      300: "#D4D4D4",
      400: "#A3A3A3",
      500: "#737373",
      600: "#525252",
      700: "#404040",
      800: "#262626",
      900: "#171717",
    },
   
  },
  typography: {
    fontFamily: "dana",
    body2: {
      color: "#00000099",
    },
    button: {
      textTransform: "none",
    },
   

    subtitle1: {
      "@media (max-width:768px)": {
        fontSize: "14px",
      },
    },
    subtitle2: {
      "@media (max-width:768px)": {
        fontSize: "12px",
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        sizeMedium: {
          height: "56px",
          borderRadius: "8px",
        },
        startIcon: {
          // The marginRight and marginLeft properties are adjusted to ensure proper spacing in RTL layouts.
          marginRight: "auto",
          marginLeft: "8px",
        },
        endIcon: {
          // The marginRight and marginLeft properties are adjusted to ensure proper spacing in RTL layouts.
          marginLeft: "auto",
          marginRight: "8px",
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          // customBold: "custombold",
          // custom: "body1",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          // padding:"0 14px",
          "& .MuiOutlinedInput-notchedOutline": {
            border: `0.5px solid #FFE4E8`,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: `1px solid #FFE4E8`, // رنگ دلخواه برای فوکوس
          },
        },
        input: {
          margin: "0 14px",
          // padding:"16.5 0!"
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          margin: 0,
          padding: "10px 10px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        // input:{
        //   margin:"0 14px",
        //   padding:"16.5 0"
        // }
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          // border: `0.5px solid #E1DEFA`,
          // boxShadow: "none",
          borderRadius: "8px",
          backgroundColor: "white",
          height: "fit-content",
        },
      },
    },
    MuiStepper: {
      styleOverrides: {
        horizontal: {
          // direction: "rtl",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          padding: "24px  32px",
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          height: "56px",
        },
      },
    },
    MuiAccordion: {
      defaultProps: {
        square: true,
        disableGutters: true,

        sx: {
          "& .Mui-expanded": {
            bgcolor: "#E1DEFA",
          },
          "&::before": {
            display: "none",
          },
        },
      },
    },
    MuiDialogTitle: {
      defaultProps: {
        dir: "rtl",
      },
    },
    MuiDialogContent: {
      defaultProps: {
        dir: "rtl",
      },
    },
  },
  /**
   * Overriding breakpoints to match the values with tailwind values
   * MUI: https://mui.com/material-ui/customization/breakpoints/
   * Tailwind: https://tailwindcss.com/docs/screens
   */
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1536,
    },
  },
});

export default theme;
