import { useEffect, useState } from "react";
import { useFormik, FormikProvider, Form } from "formik";
import { Box, Button } from "@mui/material";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { Sms } from "iconsax-react";
import OnBoardCard from "./OnBoardCard";
import { useSwipeable } from "react-swipeable";
import FormikInput from "../common/inputs/FormikInput";

import img1 from "../../assets/QR Code-amico.svg";
import img2 from "../../assets/Add to Cart-amico.svg";
import img3 from "../../assets/E-Wallet-pana (2).svg";
import theme from "../../theme";
import { useUserLogin } from "../../api/auth/loginUser";
import { notif } from "../common/notification/Notification";
import { enqueueSnackbar } from "notistack";

type LoginFormT = {
  mobileNumber: string;
};

const onBordData = [
  {
    cover_pic: img1,
    title: "QR Code  فروشگاه رو اسکن کن",
    description:
      "با اسکن کردن این QR Code وارد صفحه فروشگاه میشی و میتونی همه محصولات فروشگاه، پیشنهادهای وِیژه و قیمت ها رو ببینی و خریدت رو انجام بدی ",
  },
  {
    cover_pic: img2,
    title: "بارکد محصولات رو اسکن کن",
    description:
      "با اسکن کردن بارکد محصولات فروشگاه میتونی اطلاعات محصول و قیمت اونها رو ببینی و با انتخاب کردنشون سبد خریدت رو تکمیل کنی!",
  },
  {
    cover_pic: img3,
    title: "سبد خریدت رو پرداخت کن",
    description:
      "محصولاتی که انتخاب کردی رو بررسی و تایید کن و از طریق موبایلت، تسویه حساب رو انجام بده",
  },
];

const Login = () => {
  const navigate = useNavigate();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const {
    mutate: loginUser,
    isError,
    error,
    data: loginData,
    isSuccess,
  } = useUserLogin(); // Use the hook

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
      loginUser({
        body: {
          mobile_number: values.mobileNumber,
        },
      });
    },
  });

  const handleCardChange = (index: number) => {
    setCurrentCardIndex(index);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      console.log("1", currentCardIndex);

      handleCardChange((currentCardIndex + 1) % onBordData.length),
        console.log("2", currentCardIndex);
    },
    onSwipedRight: () =>
      handleCardChange(
        (currentCardIndex - 1 + onBordData.length) % onBordData.length
      ),
  });

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem(
        "verificationExpirationTime",
        loginData!.expire_time
      );
      notif("کد احراز هویت برای شما پیامک شد.", { variant: "success" });
      navigate(`/verify/${formik.values.mobileNumber}`);
    } else if (isError) {
      notif("َشماره وارد شده معتبر نمی‌باشد", { variant: "error" });
    }
  }, [isSuccess, isError]);
  return (
    <Box className="h-screen w-screen flex ">
      <Box
        className="w-full  md:w-1/2 lg:w-2/5  flex  flex-col justify-between  items-center p-8 "
        height={"90%"}
      >
        <Box
          className="flex flex-col w-full justify-center items-center "
          sx={{ direction: "ltr" }}
          height={"100%"}
          aria-label="onboarding"
          {...swipeHandlers}
        >
          <OnBoardCard
            cover_pic={onBordData[currentCardIndex].cover_pic}
            title={onBordData[currentCardIndex].title}
            description={onBordData[currentCardIndex].description}
          />
          <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
            {onBordData.map((_, index) => (
              <Box
                key={index}
                onClick={() => handleCardChange(index)}
                sx={{
                  width: 8,
                  height: 8,
                  mb: 2,
                  borderRadius: "50%",
                  backgroundColor:
                    currentCardIndex === index
                      ? theme.palette.primary.main
                      : "#c4c4c4",
                  cursor: "pointer",
                }}
              />
            ))}
          </Box>
        </Box>
        <Box className="w-full ">
          <FormikProvider value={formik}>
            <Form
              onSubmit={formik.handleSubmit}
              className="h-full w-full justify-center items-center  flex flex-col"
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
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
