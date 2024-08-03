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
import theme from "../../theme";
import { useNavigate } from "react-router-dom";
import { Form, FormikProvider, useFormik } from "formik";
import FormikInput from "../common/inputs/FormikInput";
import FormikSelectInput from "../common/inputs/FormikSelectInput";
import FormikDatePicker from "../common/inputs/FormikDatePicker";

type LoginFormT = {
  username: string;
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

const UserInfoDrawer: FC<UserProfileDrawerProps> = ({ open, toggleDrawer }) => {
  const navigate = useNavigate();
  const formik = useFormik<LoginFormT>({
    initialValues: {
      username: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("لطفا این قسمت را خالی نگذارید"),
    }),
    onSubmit: (values) => {
      console.log("Submitted values:", values);
      navigate("/verify");
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
      {/* <Puller/> */}
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
               sx={{height:56}}
                label="جنسیت"
                options={[
                  { value: "female", label: "زن" },
                  { value: "male", label: "مرد" },
                ]}
              />
              </Box>
             
            </Box>
            <Button type="submit" variant="contained" fullWidth size="medium">
              ثبت
            </Button>
          </Form>
        </FormikProvider>
      </Box>
    </SwipeableDrawer>
  );
};

export default UserInfoDrawer;
