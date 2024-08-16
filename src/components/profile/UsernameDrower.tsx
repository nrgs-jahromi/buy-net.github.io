import React, { FC } from "react";
import * as Yup from "yup";
import {
  Box,
  Typography,
  SwipeableDrawer,
  styled,
  Button,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { Form, FormikProvider, useFormik } from "formik";
import FormikInput from "../common/inputs/FormikInput";
import { useUserDetails } from "../../api/profile/getUserDetail";
import { useUpdateUserDetails } from "../../api/profile/updateUserDetial";
import { notif } from "../common/notification/Notification";

type LoginFormT = {
  username: string ;
};

interface UserProfileDrawerProps {
  open: boolean;
  toggleDrawer: (open: boolean) => () => void;
}

const drawerBleeding = 56;

const Puller = styled("div")(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

const UsernameDrawer: FC<UserProfileDrawerProps> = ({ open, toggleDrawer }) => {
  const navigate = useNavigate();
  const { data: userDetail, isLoading: userDetailIsLoading } = useUserDetails();
  const { mutate: updateUserDetails, isLoading: isUpdating , error } = useUpdateUserDetails();
  const formik = useFormik<LoginFormT>({
    initialValues: {
      username: userDetail?.username || "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("لطفا این قسمت را خالی نگذارید"),
    }),
    onSubmit: (values) => {
      updateUserDetails(values, {
        onSuccess: () => {
          notif("نام کاربری شما با موفقیت ویرایش شد.", { variant: "success" });
          toggleDrawer(false)(); 
        },
        onError: (error) => {
          notif("مشکلی در ویرایش نام کاربری به وجود آمده است.", { variant: "error" });
        },
      });
    },
  });

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      swipeAreaWidth={drawerBleeding}
      ModalProps={{
        keepMounted: true,
      }}
      transitionDuration={{
        enter: 500,
        exit: 500,
      }}
    >
      <Box className="p-6">
        <FormikProvider value={formik}>
          <Form
            onSubmit={formik.handleSubmit}
            className="h-full w-full justify-center items-center  flex flex-col"
          >
            <Typography variant="body1" fontWeight={"bold"} align="center">
              ویرایش نام کاربری
            </Typography>
            <Box className="flex flex-col gap-4 my-6 w-full">
              <FormikInput
                name="username"
                label="نام کاربری خود را وارد کنید"
                placeholder="نام کاربری"
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="medium"
              disabled={isUpdating}
            >
              {isUpdating ? "در حال به‌روزرسانی..." : "ثبت"}
            </Button>
          </Form>
        </FormikProvider>
      </Box>
    </SwipeableDrawer>
  );
};

export default UsernameDrawer;
