import { createTheme } from '@mui/material/styles';

const themes = createTheme({
  palette: {
   
    background: {
      default: "#030409;"
    },
  },

  typography: {
    fontFamily: ['Poppins', 'Arial', 'sans-serif'].join(','),
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "rgba(0, 0, 0, 0.70)",
          backdropFilter: "blur(8.25px)"
        },
      },
    },
    MuiButton: {
      styleOverrides:{
        root: {
          borderRadius: "5px;",
          color:"#fff",
          background: "var(--Linear, linear-gradient(90deg, #3220D0 0%, #F61A7E 100%));"
        }
      }
    },
    MuiAppBar:{
      styleOverrides: {
        root: {
          background:" linear-gradient(180deg, rgba(0, 0, 0, 0.56) 0%, rgba(0, 0, 0, 0.26) 100%);",
          backdropFilter: "blur(6px);"
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '20px',
          background: '#EEF1F9',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          display: 'flex',
          justifyContent: 'space-between',
          '> svg': {
            cursor: 'pointer',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            background: 'transparent ',
            color: '#000 ',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        // ".Mui-disabled": {
        //   background: "rgba(25, 37, 54, 0.2) !important",
        //   color: "#ffffff !important",
        // },
        a: {
          textDecoration: 'none',
        },
        '.Toastify__toast': {
          borderRadius: '20px',
        },
        '.Toastify__toast-body': {
          color: '#ED8347',
          fontWeight: '700',
        },
      },
    },
  },
});

export default themes;
