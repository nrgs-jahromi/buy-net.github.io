import { createTheme, lighten } from "@mui/material/styles";

// تابع برای تبدیل رنگ به قالب پشتیبانی‌شده
const normalizeColor = (color: string): string => {
  const validColor = /^#([0-9A-Fa-f]{3}){1,2}$/i.test(color) ? color : "#EF4056";
  return validColor;
};


const getMetaThemeColor = () => {
  const metaThemeColor = localStorage.getItem("storeColor");
  return normalizeColor(metaThemeColor ?? "#EF4056");
};

const primaryColor = getMetaThemeColor();
console.log("Primary color:", primaryColor);

const primaryLightColor = lighten(primaryColor, 0.5);

const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: {
      main: primaryColor,
      light: primaryLightColor,
    },
    secondary: {
      main: "#8489D4",
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
          marginRight: "auto",
          marginLeft: "8px",
        },
        endIcon: {
          marginLeft: "auto",
          marginRight: "8px",
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {},
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          "& .MuiOutlinedInput-notchedOutline": {
            border: `0.5px solid #E5E5E5`,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {},
        },
        input: {
          margin: "0 14px",
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
      styleOverrides: {},
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: `0.7px solid #D4D4D4`,
          boxShadow: "none",
          borderRadius: "8px",
          backgroundColor: "white",
          height: "fit-content",
        },
      },
    },
    MuiStepper: {
      styleOverrides: {
        horizontal: {},
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          padding: "24px 32px",
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
