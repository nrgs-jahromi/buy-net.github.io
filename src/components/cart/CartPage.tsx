import { Alert, Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import CartProductCard from "./CartProductCard";
import theme from "../../theme";
import PaymentDrawer from "./PaymentDrawer";
import { useCart } from "../../api/cart/getCart";
import { useCheckout } from "../../api/cart/checkout"; // اضافه کردن هوک چک اوت
import { API_BASE_URL } from "../../api/config";

const CartPage = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const storeId = localStorage.getItem("storeId")!;
  const { data: cartData, isLoading, error, refetch } = useCart(storeId);

  const { mutate: checkout, isLoading: isCheckoutLoading } = useCheckout();

  const updateProductCount = (index: number, newCount: number) => {
    if (!cartData) return;
    const updatedItems = [...cartData.items];
    updatedItems[index].quantity = newCount;
    // تغییرات لازم برای مقدار جدید در سبد خرید
  };

  const calculateTotalPrice = () => {
    if (!cartData) return 0;
    return cartData.items.reduce(
      (total, item) => total + item.quantity * Number(item.product.price),
      0
    );
  };

  const calculateTotalAmount = () => {
    return (
      cartData?.items.reduce(
        (total, item) => total + item.quantity * item.total_price_with_discount,
        0
      ) || 0
    );
  };

  const calculateTotalItems = () => {
    return (
      cartData?.items.reduce((total, item) => total + item.quantity, 0) || 0
    );
  };

  const totalAmount = calculateTotalAmount();
  const totalItems = calculateTotalItems();

  const handleConfirmAndProceed = () => {
    checkout(
      { params: { storeId } },
      {
        onSuccess: () => {
          setDrawerOpen(true);
        },
        onError: (error) => {
          console.error("Checkout error:", error);
          // مدیریت خطاها، مانند نمایش پیام خطا
        },
      }
    );
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  if (isLoading) {
    return <Typography>در حال بارگذاری...</Typography>;
  }

  if (error) {
    const errorDetail = error.response?.data?.detail;

    if (
      typeof errorDetail === "string" &&
      errorDetail === "No Cart matches the given query."
    ) {
      return <Box className="p-4">
        <Alert severity="warning">هیچ محصولی در سبد خرید شما وجود ندارد</Alert>
      </Box>
     
    }

    return <Box className="p-4">
    <Alert severity="error">خطا در دریافت اطلاعات سبد خرید.</Alert>
  </Box>
  }

  return (
    <Box
      height={"100%"}
      paddingBottom={10}
      className="space-y-3 overflow-y-auto overflow-x-hidden mb-8 mt-5"
    >
      {cartData?.items.map((item, index) => (
        <Box className="px-5" key={index}>
          <CartProductCard
            item={item}
            onCountChange={(newCount) => updateProductCount(index, newCount)}
          />
        </Box>
      ))}

      {/* Fixed Bottom Bar */}
      <Box
        position="fixed"
        bottom={72}
        left={0}
        width="100%"
        padding={2}
        bgcolor={theme.palette.background.default}
        boxShadow="0 -2px 10px rgba(0, 0, 0, 0.1)"
        borderRadius={"16px 16px 0 0"}
        zIndex={10}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleConfirmAndProceed}
          disabled={isCheckoutLoading}
        >
          تایید و ادامه
        </Button>
        <Box textAlign={"left"}>
          <Typography variant="body1" fontSize={18} fontWeight={"bold"}>
            {cartData.total_price}
            <span style={{ fontSize: 14, fontWeight: "normal" }}> تومان </span>
          </Typography>
          <Typography variant="body1" fontWeight={"bold"}>
            {cartData.total_quantity}
            <span style={{ fontSize: 14, fontWeight: "normal" }}> کالا</span>
          </Typography>
        </Box>
      </Box>

      {isDrawerOpen && (
        <PaymentDrawer
          open={isDrawerOpen}
          toggleDrawer={toggleDrawer}
          discount={calculateTotalPrice() - cartData.total_price}
          totalAmount={calculateTotalPrice()}
          totalItems={cartData.total_quantity}
          tax={cartData.tax_percentage}
        />
      )}
    </Box>
  );
};

export default CartPage;
