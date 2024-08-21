import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import CartProductCard from "./CartProductCard";
import img from "../../assets/E-Wallet-pana (2).svg";
import theme from "../../theme";
import PaymentDrawer from "./PaymentDrawer";

const initialProducts = [
  {
    image: img,
    name: "کالا ۱",
    count: 1,
    amount: 120,
  },
  {
    image: img,
    name: "کالا ۲",
    count: 2,
    amount: 12000,
  },
  {
    image: img,
    name: "کالا ۳",
    count: 1,
    amount: 10200,
  },
 
];

const CartPage = () => {
  const [products, setProducts] = useState(initialProducts);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const updateProductCount = (index:number, newCount:number) => {
    const updatedProducts = [...products];
    updatedProducts[index].count = newCount;
    setProducts(updatedProducts);
  };

  const calculateTotalAmount = () => {
    return products.reduce(
      (total, product) => total + product.count * product.amount,
      0
    );
  };

  const calculateTotalItems = () => {
    return products.reduce((total, product) => total + product.count, 0);
  };

  const totalAmount = calculateTotalAmount();
  const totalItems = calculateTotalItems();

  const handleConfirmAndProceed = () => {
    setDrawerOpen(true); 
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open); 
  };
  return (
    <Box
      height={"100%"}
      paddingBottom={10}
      className="space-y-3 overflow-y-auto overflow-x-hidden mb-8 mt-5"
    >
      {products.map((product, index) => (
        <Box className="px-5" key={index}>
          <CartProductCard
            productImage={product.image}
            productName={product.name}
            count={product.count}
            amount={product.amount}
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
            {totalAmount.toLocaleString()}
            <span style={{ fontSize: 14, fontWeight: "normal" }}> تومان </span>
          </Typography>
          <Typography variant="body1" fontWeight={"bold"}>
            {totalItems}
            <span style={{ fontSize: 14, fontWeight: "normal" }}> کالا</span>
          </Typography>
        </Box>
      </Box>
      {isDrawerOpen &&
      <PaymentDrawer open={isDrawerOpen} toggleDrawer={toggleDrawer} discount={10} totalAmount={totalAmount} totalItems={totalItems} />
      }
    </Box>
  );
};

export default CartPage;
