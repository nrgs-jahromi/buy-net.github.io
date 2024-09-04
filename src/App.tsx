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
  const [storeId, setStoreId] = useState<string>("");
  const [storeInfo, setStoreInfo] = useState<StoreInfoT | null>(null);

  const { data, isLoading, isError } = useGeneralInfo(storeId);

  useEffect(() => {
    const savedStoreId = localStorage.getItem("storeId");
    if (savedStoreId) {
      setStoreId(savedStoreId);
    }
  }, []);

  useEffect(() => {
    const savedStoreInfo = localStorage.getItem("storeGeneralInfo");
    if (savedStoreInfo) {
      setStoreInfo(JSON.parse(savedStoreInfo));
    }
  }, []);

  useEffect(() => {
    if (data) {
      const { name, color, icon } = data;
      const storeInfoObj: StoreInfoT = { name, color, icon };

      localStorage.setItem("storeName", name);
      localStorage.setItem("storeColor", color);
      localStorage.setItem("storeIcon", icon);
      setStoreInfo(storeInfoObj);
    }
  }, [data]);

  useEffect(() => {
    if (storeInfo) {
      // Dynamically update theme color
      const themeColorMetaTag = document.querySelector('meta[name="theme-color"]');
      if (themeColorMetaTag) {
        themeColorMetaTag.setAttribute("content", storeInfo.color);
      }
    }
  }, [storeInfo]);

  return (
    <Box sx={{ height: "100vh", width: "100vw" }}>
      <AppRoutes />
    </Box>
  );
};

export default App;
