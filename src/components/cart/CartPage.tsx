import { Box } from "@mui/material";
import CartProductCard from "./CartProductCard";
import img from "../../assets/E-Wallet-pana (2).svg";
const products = [
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
  return (
    <Box height={"100%"}  padding={4} className="space-y-3 overflow-y-auto overflow-x-hidden">
      {products.map((product, index) => (
        <CartProductCard
          key={index}
          productImage={product.image}
          productName={product.name}
          count={product.count}
          amount={product.amount}
        />
      ))}
    </Box>
  );
};
export default CartPage;
