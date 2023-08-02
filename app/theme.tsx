import { createTheme } from "@mui/material/styles";


const theme = createTheme({
  palette: {
    //mode: "dark",
    background: {
      default: "#343a40"
    },
    text: {
      primary: "#F0F0F0",
      secondary: "#161616",
    },
    primary: {
      main: "#161616"
    },
    secondary: {
      main: "#EEFD53"
    },
    error: {
      main: "#DA1E28"
    }
  },
  typography: {
    fontFamily: ["Noto Sans KR", "sans-serif", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue"].join(","),
  },
});

export default theme;