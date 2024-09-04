import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import AppRoutes from "./components/routers/AppRoutes";
import "./index.css";
import { useGeneralInfo } from "./api/store/getGeneralInfo";

type StoreInfoT = {
  name: string;
  color: string;
  icon: string;
};

const App = () => {


  return (
    <Box sx={{ height: "100vh", width: "100vw" }}>
      <AppRoutes />
    </Box>
  );
};

export default App;
