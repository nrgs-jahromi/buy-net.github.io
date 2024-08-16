import React, { FC, useEffect } from "react";
import {
  Box,
  Typography,
  SwipeableDrawer,
  Button,
  styled,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { Form, FormikProvider, useFormik } from "formik";
import { useUserDetails } from "../../api/profile/getUserDetail";
import FormikInput from "../common/inputs/FormikInput";
import FormikSelectInput from "../common/inputs/FormikSelectInput";
import FormikDatePicker from "../common/inputs/FormikDatePicker";
import { useUpdateUserDetails } from "../../api/profile/updateUserDetial";
import { notif } from "../common/notification/Notification";

type LoginFormT = Partial<UserDetailsT>

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

const UserInfoDrawer: FC<UserProfileDrawerProps> = ({ open, toggleDrawer }) => {
  const navigate = useNavigate();
  const { data: userDetail, isLoading: userDetailIsLoading } = useUserDetails();
  const { mutate: updateUserDetails, isLoading: isUpdating } = useUpdateUserDetails();

  const formik = useFormik<LoginFormT>({
    initialValues: {
      first_name: userDetail?.first_name || null,
      last_name: userDetail?.last_name || null,
      birth_date: userDetail?.birth_date || null,
      gender: userDetail?.gender || null,
    },
    enableReinitialize: true, 
    onSubmit: (values) => {
      const updatedFields: Partial<LoginFormT> = {};

      if (values.first_name !== userDetail?.first_name) {
        updatedFields.first_name = values.first_name;
      }
      if (values.last_name !== userDetail?.last_name) {
        updatedFields.last_name = values.last_name;
      }
      if (values.birth_date !== userDetail?.birth_date) {
        updatedFields.birth_date = values.birth_date;
      }
      if (values.gender !== userDetail?.gender) {
        updatedFields.gender = values.gender;
      }

      
        updateUserDetails(updatedFields, {
          onSuccess: () => {
            notif("اطلاعات شما با موفقیت ویرایش شد.", {variant:"success"})
            toggleDrawer(false)()
          },
          onError: (error) => {
           notif("مشکلی در ویرایش اطلاعات به وجود آمده است.", {variant:"error"})
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
              اطلاعات فردی
            </Typography>
            <Box className="flex flex-col gap-2 w-full">
              <FormikInput name="first_name" label="نام " />
              <FormikInput name="last_name" label="نام خانوادگی" />
              <Box className="grid grid-cols-2 gap-4  w-full">
                <FormikDatePicker name="birth_date" label="تاریخ تولد" />
                <FormikSelectInput
                  name="gender"
                  sx={{ height: 56 }}
                  label="جنسیت"
                  options={[
                    { value: "M", label: "مرد" },
                    { value: "F", label: "زن" },
                    { value: "O", label: "سایر" },
                  ]}
                />
              </Box>
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

export default UserInfoDrawer;
