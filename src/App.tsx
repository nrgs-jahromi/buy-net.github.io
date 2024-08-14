import { Box } from "@mui/material";
import { FC } from "react";
import AppRoutes from "./components/routers/AppRoutes";
import "./index.css";

const App: FC = () => {
  // useEffect(() => {
  //   const metaThemeColor = document.querySelector("meta[name='theme-color']");
  //   if (metaThemeColor) {
  //     metaThemeColor.setAttribute("content", "#8489D4"); 
  //   }
  // }, []);
  return (
    <Box sx={{ height: "100vh", width: "100vw" }}>
      <AppRoutes />
    </Box>
  );
};

export default App;
