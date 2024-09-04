import { useFormik, FormikProvider, Form } from "formik";
import { Box, Button, Typography } from "@mui/material";
import theme from "../../theme";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useState, useEffect } from "react";
import { useUserLogin } from "../../api/auth/loginUser";
import { useUserVerification } from "../../api/auth/verifyUser";
import { notif } from "../common/notification/Notification";

type LoginFormT = {
  otp: string;
};

const Verification = () => {
  const navigate = useNavigate();
  const { phoneNumber } = useParams<{ phoneNumber: string }>();
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(10);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  const { mutate, isLoading, error } = useUserVerification();

  const formik = useFormik<LoginFormT>({
    initialValues: {
      otp: "",
    },
    validationSchema: Yup.object().shape({
      otp: Yup.string().required("Please enter your verification code."),
    }),
    onSubmit: (values) => {
      mutate(
        {
          body: {
            mobile_number: phoneNumber || "",
            verification_code: values.otp,
          },
        },
        {
          onSuccess: (data) => {
            console.log("Login successful:", data.token);
            localStorage.setItem("accessToken", data.token);
            notif("با موفقیت وارد شدید.", { variant: "success" });
            navigate("/explore");
          },
          onError: (err) => {
            console.error("Login error:", err);
            notif("کد وارد شده معتبر نمی‌باشد.", { variant: "error" });
          },
        }
      );
    },
  });

  const handleChange = (newValue: string) => {
    setOtp(newValue);
    formik.setFieldValue("otp", newValue);
  };

  const handleResend = () => {
    navigate("/");
  };

  useEffect(() => {
    const expirationTime = localStorage.getItem("verificationExpirationTime");
    if (expirationTime) {
      // Parse the expiration time from localStorage
      const expirationDate = new Date(expirationTime);
      const now = new Date();

      // Calculate the difference in seconds
      const timeLeft = Math.max(
        0,
        Math.floor((expirationDate.getTime() - now.getTime()) / 1000)
      );
      setTimer(timeLeft);
      setIsTimerRunning(timeLeft > 0);
    }
  }, []);

  useEffect(() => {
    if (isTimerRunning && timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(countdown);
            setIsTimerRunning(false);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [isTimerRunning, timer]);

  // Calculate minutes and seconds
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  useEffect(() => {
    if (isTimerRunning) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => (prevTimer === 0 ? 0 : prevTimer - 1));
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [isTimerRunning]);

  useEffect(() => {
    if (timer === 0) {
      setIsTimerRunning(false);
    }
  }, [timer]);

  return (
    <Box className="h-screen w-screen flex">
      <Box className="flex w-full md:w-1/2 lg:w-2/5 justify-center items-center h-full">
        <FormikProvider value={formik}>
          <Form
            onSubmit={formik.handleSubmit}
            className="h-full w-full p-10 justify-center items-center gap-10 flex flex-col"
          >
            {/* <img src={logo} height={96} width={96} alt="Logo" /> */}
            <Box>
              <Typography variant="h5" align="center" fontWeight={"bold"}>
                احراز هویت
              </Typography>
              <Typography variant="body1" align="center">
                برای احراز هویت، کد ارسال شده به شماره موبایل خود را وارد کنید
              </Typography>
            </Box>
            <Box className="w-full">
              <Box className="flex flex-col gap-8 my-10 w-full">
                <Box>
                  <Typography variant="h6" marginBottom={1}>
                    کد تایید
                  </Typography>
                  <MuiOtpInput
                    dir="ltr"
                    value={otp}
                    length={4}
                    onChange={handleChange}
                    sx={{ padding: 0 }}
                    TextFieldsProps={{ type: "number" }}
                  />
                </Box>
                <Typography
                  variant="subtitle1"
                  marginTop={-3}
                  color={theme.palette.grey[500]}
                >
                  {timer === 0 ? (
                    <Button onClick={handleResend} color="primary" size="small">
                      ارسال مجدد کد تایید
                    </Button>
                  ) : (
                    `زمان باقی‌مانده: ${minutes} دقیقه و ${seconds} ثانیه`
                  )}
                </Typography>
              </Box>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="medium"
                disabled={isLoading} // Disable the button while the mutation is loading
              >
                ادامه
              </Button>
              {error && (
                <Typography color="error" variant="body2">
                  خطا در ورود: {error.message}
                </Typography>
              )}
            </Box>
          </Form>
        </FormikProvider>
      </Box>
    </Box>
  );
};

export default Verification;
