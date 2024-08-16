import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  ListItem,
  Button,
  Divider,
} from "@mui/material";
import theme from "../../theme";
import profileImg from "../../assets/profile-circle.svg";
import {
  ArrowLeft2,
  Camera,
  Clock,
  InfoCircle,
  Mobile,
  Notification,
  Profile,
} from "iconsax-react";
import { useNavigate } from "react-router-dom";
import UsernameDrawer from "./UsernameDrower";
import UserInfoDrawer from "./UserInfoDrawer";
import { useUserLogout } from "../../api/auth/logout";
import { useUserDetails } from "../../api/profile/getUserDetail";

const UserProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [usernameDrawerOpen, setUsernameDrawerOpen] = useState(false);
  const [userInfoDrawerOpen, setUserInfoDrawerOpen] = useState(false);
  const { mutate: logout, isLoading } = useUserLogout();
  const {data:userDetail , isLoading:userDetailIsLoading} = useUserDetails()
  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        localStorage.removeItem("accessToken"); 
        navigate("/login"); 
      },
      onError: (error) => {
        console.error("Error logging out:", error); 
      }
    });
  };
  const toggleUsernameDrawer = (open: boolean) => () => {
    setUsernameDrawerOpen(open);
  };

  const toggleUserInfoDrawer = (open: boolean) => () => {
    setUserInfoDrawerOpen(open);
  };

  const glassStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    backdropFilter: "blur(10px)",
    padding: "0.7rem",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  };

  return (
    <Box className="w-full h-full" sx={{ position: "relative" }}>
      <Box
        sx={{
          bgcolor: theme.palette.primary.main,
          width: "100%",
          height: "33%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          position: "relative",
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            color: "white",
          }}
        >
          <Notification />
        </IconButton>
        <Box sx={{ ...glassStyle }}>
          <Box sx={{ ...glassStyle }}>
            <Box sx={{ ...glassStyle }}>
              <Box sx={{ ...glassStyle, width: 100, height: 100 }}>
              <Typography variant="h4" fontWeight={"700"}>
                  {userDetail?.username?.charAt(0)?.toUpperCase() || "ک"}
                </Typography>
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  padding: 1,
                  borderRadius: "50%",
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.background.default,
                  border: `2px solid ${theme.palette.background.default}`,
                }}
              >
                <Camera size={18} />
              </Box>
            </Box>
          </Box>
        </Box>
        <Typography
          color={theme.palette.background.default}
          variant="body1"
          fontWeight={"bold"}
        >
           {userDetail?.username}
        </Typography>
      </Box>
      <Box className="p-8 flex flex-col text-natural-400 gap-8">
        <Box>
          <Typography variant="body1" fontWeight={"700"} mb={1}>
            تاریخچه
          </Typography>
          <ListItem
            dir="rtl"
            color={theme.palette.text.primary}
            sx={{
              px: 0,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              className="flex gap-3 items-center"
              color={theme.palette.text.primary}
            >
              <Clock size={20} />
              <Typography variant="body2" fontSize={18}>
                خریدهای پیشین
              </Typography>
            </Box>

            <Button
              size="small"
              sx={{ color: theme.palette.grey[400] }}
              endIcon={<ArrowLeft2 size={16} />}
              onClick={() => navigate("/history")}
            >
              مشاهده همه
            </Button>
          </ListItem>
        </Box>
        <Box>
          <Typography variant="body1" fontWeight={"700"} mb={1}>
            اطلاعات حساب کاربری
          </Typography>
          <ListItem
            dir="rtl"
            color={theme.palette.text.primary}
            sx={{
              px: 0,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              className="flex gap-3 items-center"
              color={theme.palette.text.primary}
            >
              <Mobile size={20} />
              <Typography variant="body2" fontSize={18}>
                شماره تلفن
              </Typography>
            </Box>

            <Typography variant="body2">{userDetail?.mobile_number}</Typography>
          </ListItem>
          <Divider />
          <ListItem
            dir="rtl"
            color={theme.palette.text.primary}
            sx={{
              px: 0,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              className="flex gap-3 items-center"
              color={theme.palette.text.primary}
            >
              <Profile size={20} />
              <Typography variant="body2" fontSize={18}>
                نام کاربری
              </Typography>
            </Box>

            <Button
              size="small"
              sx={{ color: theme.palette.grey[400] }}
              endIcon={<ArrowLeft2 size={16} />}
              onClick={toggleUsernameDrawer(true)}
            >
           {userDetail?.username}
          </Button>
          </ListItem>
          <Divider />

          <ListItem
            dir="rtl"
            color={theme.palette.text.primary}
            sx={{
              px: 0,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              className="flex gap-3 items-center "
              color={theme.palette.text.primary}
            >
              <InfoCircle size={20} />
              <Typography variant="body2" fontSize={18}>
                اطلاعات فردی
              </Typography>
            </Box>

            <Button
              size="small"
              sx={{ color: theme.palette.grey[400], width: "fit-content" }}
              endIcon={<ArrowLeft2 size={16} />}
              onClick={toggleUserInfoDrawer(true)}
            >
              {userDetail?.first_name ?? "ویرایش"  }
            </Button>
          </ListItem>
        </Box>
        <Button onClick={handleLogout} >خروج از حساب کاربری</Button>
      </Box>
      {usernameDrawerOpen && (
        <UsernameDrawer open={usernameDrawerOpen} toggleDrawer={toggleUsernameDrawer} />
      )}
      {userInfoDrawerOpen && (
        <UserInfoDrawer open={userInfoDrawerOpen} toggleDrawer={toggleUserInfoDrawer} />
      )}
    </Box>
  );
};

export default UserProfilePage;
