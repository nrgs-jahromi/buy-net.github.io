import { Box } from "@mui/material";
import { FC } from "react";
import AppRoutes from "./components/routers/AppRoutes";
import "./index.css";

const App: FC = () => {
  return (
    <Box sx={{ height: "100vh", width: "100vw" }}>
      <AppRoutes />
    </Box>
  );
};

export default App;
