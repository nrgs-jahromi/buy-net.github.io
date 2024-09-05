import { Box, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import CartProductCard from "./CartProductCard";
import theme from "../../theme";
import PaymentDrawer from "./PaymentDrawer";
import { useCart } from "../../api/cart/getCart";
import { API_BASE_URL } from "../../api/config";

const CartPage = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
const storeId = localStorage.getItem("storeId")
  // استفاده از هوک useCart برای گرفتن اطلاعات سبد خرید
  const { data: cartData, isLoading, error } = useCart(storeId!);

  const updateProductCount = (index: number, newCount: number) => {
    if (!cartData) return;
    const updatedItems = [...cartData.items];
    updatedItems[index].quantity = newCount;
    // تغییرات لازم برای مقدار جدید در سبد خرید
  };

  // const calculateTotalAmount = () => {
  //   return cartData?.items.reduce(
  //     (total, item) => total + item.quantity * item.total_price_with_discount,
  //     0
  //   ) || 0;
  // };

  // const calculateTotalItems = () => {
  //   return cartData?.items.reduce((total, item) => total + item.quantity, 0) || 0;
  // };

  // const totalAmount = calculateTotalAmount();
  // const totalItems = calculateTotalItems();

  const handleConfirmAndProceed = () => {
    setDrawerOpen(true);
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  if (isLoading) {
    return <Typography>در حال بارگذاری...</Typography>;
  }

  if (error) {
    return <Typography>خطا در دریافت اطلاعات سبد خرید.</Typography>;
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
            productImage={API_BASE_URL+item.product.primary_image}
            productName={item.product.name}
            count={item.quantity}
            amount={item.total_price_with_discount}
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
        <Button variant="contained" color="primary" onClick={handleConfirmAndProceed}>
          تایید و ادامه
        </Button>
        <Box textAlign={"left"}>
          <Typography variant="body1" fontSize={18} fontWeight={"bold"}>
           
            <span style={{ fontSize: 14, fontWeight: "normal" }}> تومان </span>
          </Typography>
          <Typography variant="body1" fontWeight={"bold"}>
          
            <span style={{ fontSize: 14, fontWeight: "normal" }}> کالا</span>
          </Typography>
        </Box>
      </Box>

      {isDrawerOpen && (
        <PaymentDrawer
          open={isDrawerOpen}
          toggleDrawer={toggleDrawer}
          discount={10}
          totalAmount={10}
          totalItems={10}
        />
      )}
    </Box>
  );
};

export default CartPage;
