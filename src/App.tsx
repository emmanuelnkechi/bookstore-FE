import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import ToastWidget from "./components/ToastWidget";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useState } from 'react'
import { Home } from "./pages/Home";
import './App.scss'

const theme = createTheme({
  palette: {
    primary: {
      main: "#009444",
      light: "#F5FAFF",
      dark: "#00233F",
    },
    secondary: {
      main: "#FF9700",
      contrastText: "#fff",
      light: "#FF97000D",
    },
  },
  typography: {
    fontFamily: "AvenirNext, Arial",
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:disabled": {
            opacity: 0.5,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "capitalize",
          fontWeight: 500,
          boxShadow: "none",
          fontSize: "14px !important",
          height: "46px",
          "&:hover": {
            boxShadow: "none",
            bgcolor: "transparent",
          },
          "&:disabled": {
            cursor: "not-allowed",
          },
          "&.MuiButton-sizeMedium": {
            fontSize: "0.9rem",
          },
          "&.MuiButton-sizeLarge": {
            minHeight: 42,
          },
          "&.MuiButton-sizeSmall": {
            padding: "6px 16px",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          color: "#00233F",
          height: 28,
          borderRadius: "8px",

          "&.MuiChip-colorSuccess": {
            backgroundColor: "#EBF6F0",
            color: "#009444",
          },
          "&.MuiChip-colorError": {
            backgroundColor: "#FBE6EA",
            color: "#D90429",
          },
          "&.MuiChip-colorWarning": {
            backgroundColor: "#FFF8E7",
            color: "#FFB60A",
          },
          "&.MuiChip-colorDefault": {
            backgroundColor: "#EFF2F6",
            color: "#5C636D",
          },
          "&.MuiChip-colorInfo": {
            backgroundColor: "#EDF5FE",
            color: "#0059DE",
          },

          span: {
            fontWeight: 400,
            fontSize: "12px",
          },
        },
      },
    },
  },
});


function App() {
  const [themecolor] = useState("neutral");


  return (
    <>
      <ThemeProvider theme={theme}>
      <ToastWidget />
        <div className={`theme-${themecolor} w-full`}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </BrowserRouter>

        </div>
      </ThemeProvider>
    </>

  )
}

export default App
