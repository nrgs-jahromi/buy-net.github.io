import { useState } from "react";
import { Box, Paper, Typography, IconButton, Button } from "@mui/material";
import { FC } from "react";
import { useSwipeable } from "react-swipeable";
import { Trash, Add, Minus } from "iconsax-react";
import theme from "../../theme";
import { API_BASE_URL } from "../../api/config";
import img1 from "../../assets/DefaultImage.png";
import { useMutation } from "@tanstack/react-query";
import { useAddToCart } from "../../api/cart/addToCart";
import { CartItemT } from "../../api/cart/getCart";
import { useRemoveFromCart } from "../../api/cart/removeFromCart";

interface CartCardProps {
  item: CartItemT;
  onCountChange: (newCount: number) => void;
}

const CartProductCard: FC<CartCardProps> = ({ item, onCountChange }) => {
  const [isSwipedLeft, setIsSwipedLeft] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const [count, setCount] = useState(item.quantity);

  const addToCartMutation = useAddToCart();
  const removeFromCartMutation = useRemoveFromCart();
  const storeId = localStorage.getItem("storeId");

  const handleAddToCart = () => {
    addToCartMutation.mutate({
      params: {
        storeId: storeId!,
      },
      body: [
        {
          barcode: item.product.barcode,
          quantity: 1,
        },
      ],
    });
  };

  const handleRemoveFromCart = (quantity: number) => {
    removeFromCartMutation.mutate({
      params: {
        storeId: storeId!,
      },
      body: [
        {
          barcode: item.product.barcode,
          quantity: quantity,
        },
      ],
    });
  };

  // حذف کامل آیتم
  const handleDeleteItem = () => {
    handleRemoveFromCart(count); // حذف کل تعداد
    setCount(0); // برای مخفی کردن آیتم از لیست
    onCountChange(0); // اعلام تغییر تعداد به والد
  };

  const handleSwipeLeft = () => {
    setIsSwipedLeft(true);
    setTranslateX(-80);
  };

  const handleSwipeRight = () => {
    setIsSwipedLeft(false);
    setTranslateX(0);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
    trackMouse: true,
  });

  const handleIncrease = () => {
    const newCount = count + 1;
    setCount(newCount);
    onCountChange(newCount);
    handleAddToCart();
  };

  const handleDecrease = () => {
    const newCount = count - 1;
    setCount(newCount);
    onCountChange(newCount);
    handleRemoveFromCart(1);
  };

  if (count === 0) {
    return <></>;
  }

  return (
    <Box position="relative" width="100%">
      <Button
        style={{
          position: "absolute",
          top: "50%",
          width: 70,
          height: "100%",
          backgroundColor: theme.palette.primary.light,
          transform: "translateY(-50%)",
          transition: "opacity 0.3s ease-in-out",
          opacity: isSwipedLeft ? 1 : 0,
          zIndex: isSwipedLeft ? 1 : -1,
        }}
        color="error"
        onClick={handleDeleteItem} // حذف کل آیتم
      >
        <Trash />
      </Button>
      <Box
        component={Paper}
        className="w-full flex p-3"
        {...swipeHandlers}
        style={{
          transform: `translateX(${translateX}px)`,
          transition: "transform 0.3s ease-in-out",
          cursor: "grab",
        }}
      >
        <img
          src={
            item.product.primary_image_url
              ? API_BASE_URL + item.product.primary_image_url
              : img1
          }
          height={60}
          width={60}
          style={{ borderRadius: "8px" }}
        />
        <Box width={"100%"} className="flex justify-between px-4">
          <Box className="flex h-full flex-col justify-between">
            <Typography variant="body1" fontWeight={"bold"}>
              {item.product.name}
            </Typography>
            <Typography>{item.product.price.toLocaleString()} تومان</Typography>
          </Box>
        </Box>
        <Box className="flex justify-between items-center">
          <IconButton
            onClick={handleIncrease}
            color="primary"
            className="rounded-md"
          >
            <Add />
          </IconButton>
          <Typography variant="caption">{count}</Typography>
          <IconButton onClick={handleDecrease} color="primary">
            <Minus />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default CartProductCard;
