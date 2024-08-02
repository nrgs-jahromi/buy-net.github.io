import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router";
import FixedBottomNavigation from "./MobileNavigation";
import { useEffect } from "react";
// import { getFromLocalStorage } from "../../utils/localStorage";
// import { LS_ACCESS_TOKEN } from "../../constants/localStorage";

const MainTemplate = () => {
  const isLargeScreen = useMediaQuery("(min-width: 768px)");

  // useEffect(() => {
  //   const accessToken = getFromLocalStorage(LS_ACCESS_TOKEN)

  //   if (!accessToken) {
  //     window.location.href = "/login";
  //   }
  // }, []);

  return (
    <Box className="flex flex-row h-screen w-screen ">
      <Box className="flex flex-col w-full h-full  overflow-auto">
        {/* <TemplateHeader /> */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            padding: "32px",
            paddingBottom: isLargeScreen ? "" : "100px",
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
