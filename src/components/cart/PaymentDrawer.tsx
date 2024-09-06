import { FC } from "react";

import {
  Box,
  Typography,
  SwipeableDrawer,
  styled,
  Button,
  Divider,
} from "@mui/material";
import { grey } from "@mui/material/colors";

import { useFormik, FormikProvider, Form } from "formik";
import FormikInput from "../common/inputs/FormikInput";
import { useConfirmPayment } from "../../api/cart/confirmPayment";

interface PaymentDrawerProps {
  open: boolean;
  toggleDrawer: (open: boolean) => () => void;
  totalItems: number;
  totalAmount: number;
  discount: number;
  tax: string;
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

const PaymentDrawer: FC<PaymentDrawerProps> = ({
  open,
  toggleDrawer,
  totalItems,
  totalAmount,
  discount,
  tax,
}) => {
  const storeId = localStorage.getItem("storeId")!;
  const { mutate: confirmPayment, isLoading: isConfirmLoading } =
    useConfirmPayment();
  const formik = useFormik({
    initialValues: {
      discountCode: "",
    },

    onSubmit: (values) => {
      console.log("Applied discount code:", values.discountCode);
      // Handle discount code application logic here
    },
  });

  const payableAmount = totalAmount - discount +totalAmount * Number(tax);
  const handleConfirmAndPay = () => {
    confirmPayment(
      { params: { storeId } },
      {
        onSuccess: () => {
          toggleDrawer(open);
        },
        onError: (error) => {
          console.error("Checkout error:", error);
          // مدیریت خطاها، مانند نمایش پیام خطا
        },
      }
    );
  };

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
            className="h-full w-full justify-center items-center flex flex-col"
          >
            <Typography variant="body1" fontWeight={"bold"} align="center">
              کد تخفیف
            </Typography>
            <Box className="flex  gap-4 my-6 w-full items-end justify-between">
              <FormikInput
                //   fullWidth
                sx={{ width: "100%" }}
                name="discountCode"
                label="کد تخفیف"
                placeholder="کد تخفیف خود را وارد کنید"
              />
              <Button
                variant="outlined"
                fullWidth
                size="medium"
                sx={{ width: 100, mb: 2 }}
              >
                اعمال
              </Button>
            </Box>
          </Form>
        </FormikProvider>

        <Box mt={1} className="w-full">
          <Box className="w-full flex justify-between items-center">
            <Typography variant="body1">مجموع اقلام</Typography>
            <Typography variant="body1" fontWeight={"bold"}>
              {totalItems}
            </Typography>
          </Box>
          <Box className="w-full flex justify-between items-center">
            <Typography variant="body1">سود شما از خرید</Typography>
            <Typography variant="body1" fontWeight={"bold"}>
              {discount.toLocaleString()}
            </Typography>
          </Box>
          <Box className="w-full flex justify-between items-center">
            <Typography variant="body1">مالیات </Typography>
            <Typography variant="body1" fontWeight={"bold"}>
            {(totalAmount * Number(tax)).toLocaleString()}
            </Typography>
          </Box>
          <Box className="w-full flex justify-between items-center">
            <Typography variant="body1">مجموع</Typography>
            <Typography variant="body1" fontWeight={"bold"}>
              {totalAmount.toLocaleString()}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />
          <Box className="w-full flex justify-between items-center">
            <Typography variant="body1">مجموع قابل پرداخت</Typography>
            <Typography variant="body1" fontWeight={"bold"}>
              {payableAmount.toLocaleString()} تومان
            </Typography>
          </Box>
        </Box>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          //   size="large"
          style={{ marginTop: "16px" }}
          onClick={handleConfirmAndPay}
        >
          تایید و پرداخت
        </Button>
      </Box>
    </SwipeableDrawer>
  );
};

export default PaymentDrawer;
