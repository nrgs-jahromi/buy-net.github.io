import { useState } from "react";
import { Box, Paper, Typography, IconButton, Button } from "@mui/material";
import { FC } from "react";
import { useSwipeable } from "react-swipeable";
import { Trash, Add, Minus } from "iconsax-react";
import theme from "../../theme";

interface CartCardProps {
  productImage: string;
  productName: string;
  count: number;
  amount: number;
}

const CartProductCard: FC<CartCardProps> = ({
  productImage: storeImage,
  amount,
  productName: storeName,
  count: initialCount,
}) => {
  const [isSwipedLeft, setIsSwipedLeft] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const [count, setCount] = useState(initialCount);

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

  const handleIncrease = () => setCount((prev) => prev + 1);
  const handleDecrease = () => setCount((prev) => Math.max(prev - 1, 0));

  if(count === 0)
  {
    return<></>
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
        onClick={() => console.log("Delete item")}
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
          src={storeImage}
          height={60}
          width={60}
          style={{ borderRadius: "8px" }}
        />
        <Box width={"100%"} className="flex  justify-between px-4">
          <Box className=" flex h-full flex-col justify-between ">
            <Typography variant="body1" fontWeight={"bold"}>
              {storeName}
            </Typography>
            <Typography>{amount.toLocaleString()} تومان</Typography>
          </Box>
        </Box>
        <Box className=" flex justify-between items-center">
          <IconButton onClick={handleIncrease} color="primary" className="rounded-md">
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
