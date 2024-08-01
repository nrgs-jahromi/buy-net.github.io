import React, { useEffect, useState } from "react";
import { useFormik, FormikProvider, Form } from "formik";
import { Box, Button, TextField, Typography } from "@mui/material";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import logo from "../../assets/react.svg";
import FormikInput from "../common/inputs/FormikInput";
import { Sms } from "iconsax-react";
import OnBoardCard from "./OnBoardCard";
import { NumericFormat, NumericFormatProps } from "react-number-format";

type LoginFormT = {
  mobileNumber: string;
};

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        valueIsNumericString
       
      />
    );
  }
);

const Login = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  const formik = useFormik<LoginFormT>({
    initialValues: {
      mobileNumber: "",
    },
    validationSchema: Yup.object().shape({
      mobileNumber: Yup.string()
        .required("لطفا این قسمت را خالی نگذارید")
        .matches(/^[0-9]{10,11}$/, "شماره موبایل معتبر نیست."),
    }),
    onSubmit: (values) => {
      console.log("Submitted values:", values);
      navigate("/verify");
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  useEffect(() => {
    console.log("Current value:", value);
  }, [value]); 
  return (
    <Box className="h-screen w-screen flex">
      <Box className="w-full md:w-1/2 lg:w-2/5 justify-center items-center h-full pt-10 px-8">
        <Box
          className="flex flex-col w-full justify-center items-center pt-10 px-8"
          aria-label="onboarding"
        >
          <OnBoardCard
            cover_pic={logo}
            title="ورود به مهراوه"
            description="به جاوید خوش آمدید. جهت ورود به جاوید شماره موبایل خود را وارد کنید."
          />
        </Box>
        <Box className="w-full">
          <FormikProvider value={formik}>
            <Form
              onSubmit={formik.handleSubmit}
              className="h-full w-full p-10 justify-center items-center gap-10 flex flex-col"
            >
              <Box className="flex flex-col gap-8 my-10 w-full">
                <FormikInput
                  name="mobileNumber"
                  label="شماره موبایل"
                  placeholder="شماره موبایل خود را وارد کنید"
                  Icon={<Sms />}
                />
              </Box>
              <Button type="submit" variant="contained" fullWidth size="medium">
                ورود
              </Button>
            </Form>
          </FormikProvider>
          <TextField
          dir="ltr"
            label="react-number-format"
            value={value}
            onChange={handleChange}
            name="numberformat"
            id="formatted-numberformat-input"
            InputProps={{
              inputComponent: NumericFormatCustom as any,
            }}
            variant="standard"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
