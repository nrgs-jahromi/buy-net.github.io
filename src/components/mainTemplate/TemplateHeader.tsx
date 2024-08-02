import React, { useState } from "react";
import { Box, Divider, Typography, useMediaQuery } from "@mui/material";
import theme from "../../theme";
import profile from "../../assets/avatar.png";
// import moment from "jalali-moment";
// import { useAdminInformation } from "../../api/admin/getAdminInfo";
// import { API_BASE_URL } from "../../vars/env";

const TemplateHeader = () => {
  const isMdScreen = useMediaQuery(theme.breakpoints.up("md"));
  // const today = moment().locale("fa").format("dddd DD  MMMM ماه  YYYY ");
  // const { data:userInfo, isLoading, } = useAdminInformation();
  // State for NotificationsMenu
  const [notifAnchorEl, setNotifAnchorEl] = useState<null | HTMLElement>(null);
  const openNotifMenu = Boolean(notifAnchorEl);

  // State for ProfileMenu
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(null);
  const openProfileMenu = Boolean(profileAnchorEl);

  // Handlers for NotificationsMenu
  const handleNotifClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotifAnchorEl(event.currentTarget);
  };

  const handleNotifClose = () => {
    setNotifAnchorEl(null);
  };

  // Handlers for ProfileMenu
  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };

  return (
    <Box className="w-full h-16 flex flex-rows justify-between px-8 py-6 sticky top-0 bg-white z-10 border-b bottom-1 md:border-none">
      <Box className="w-fit h-full flex flex-rows justify-between gap-4 items-center">
        {isMdScreen && (
          <>
            {/* <Typography variant="subtitle1" fontWeight="bold" color="#2C266A">
              {userInfo?.first_name ? userInfo.first_name : userInfo?.username} عزیز؛ خوش اومدی!
            </Typography> */}
            <Divider orientation="vertical" variant="middle" />
          </>
        )}
        {/* <Typography variant="subtitle1">{today}</Typography> */}
      </Box>
      <Box className="w-fit h-full flex flex-rows justify-between gap-4 items-center">
        {/* <NotificationsMenu
          anchorEl={notifAnchorEl}
          open={openNotifMenu}
          handleClose={handleNotifClose}
          handleClick={handleNotifClick}
        />
        <Divider orientation="vertical" variant="middle" /> */}
        {/* <img src={userInfo?.profile_image ? API_BASE_URL +userInfo.profile_image.url : profile } className="rounded-full h-8 w-8" alt="profileImg" /> */}
        {/* {isMdScreen && <Typography variant="subtitle1">{userInfo?.first_name ? userInfo.first_name : userInfo?.username}</Typography>} */}
       
      </Box>
    </Box>
  );
};

export default TemplateHeader;
