import { createTheme } from "@mui/material/styles";

const themes = createTheme({
  palette: {
    primary: {
      main: "#E77B3D",
    },
    background: {
      default: "#EEF1F9",
    },
  },

  typography: {
    fontFamily: ["Poppins", "Arial", "sans-serif"].join(","),
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "#EEF1F9",
          backdropFilter: "blur(2px)",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "20px",
          background: "#EEF1F9",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          display: "flex",
          justifyContent: "space-between",
          "> svg": {
            cursor: "pointer",
          },
        },
      },
    },
    MuiTab: {
      styleOverrides:{
        root: {
          "&.Mui-disabled": {
            background: "transparent ",
            color: "#000 ",
          },
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        // ".Mui-disabled": {
        //   background: "rgba(25, 37, 54, 0.2) !important",
        //   color: "#ffffff !important",
        // },
        a: {
          textDecoration: 'none'
        },
        ".Toastify__toast": {
          borderRadius: "20px",
        },
        ".Toastify__toast-body": {
          color: "#ED8347",
          fontWeight: "700",
        },
      },
    },
  },
});

export default themes;
