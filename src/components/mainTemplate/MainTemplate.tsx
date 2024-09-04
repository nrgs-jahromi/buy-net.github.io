import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router";
import FixedBottomNavigation from "./MobileNavigation";
import { useEffect, useState } from "react";
import { useGeneralInfo } from "../../api/store/getGeneralInfo";
import theme from "../../theme";
// import { getFromLocalStorage } from "../../utils/localStorage";
// import { LS_ACCESS_TOKEN } from "../../constants/localStorage";

type StoreInfoT = {
  name: string;
  color: string;
  icon: string;
};
const MainTemplate = () => {
  const isLargeScreen = useMediaQuery("(min-width: 768px)");

  const [storeId, setStoreId] = useState<string>("");
  const [storeInfo, setStoreInfo] = useState<StoreInfoT | null>(null);

  const { data, isLoading, isError, refetch } = useGeneralInfo(storeId);

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
      const themeColorMetaTag = document.querySelector(
        'meta[name="theme-color"]'
      );
      if (themeColorMetaTag) {
        themeColorMetaTag.setAttribute("content", storeInfo.color);
      }
    }
  }, [storeInfo]);

  return (
    <Box className="flex flex-row h-screen w-screen ">
      <Box className="flex flex-col w-full h-full  overflow-auto">
        {/* <TemplateHeader /> */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            // padding: "32px",
            paddingBottom: "75px",
          }}
        >
          <Outlet />
        </Box>
      </Box>
      <Box marginTop={10}>{<FixedBottomNavigation />}</Box>
    </Box>
  );
};
export default MainTemplate;
