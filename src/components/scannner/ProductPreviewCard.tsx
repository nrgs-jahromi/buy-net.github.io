import { Box, Button, Popover, Typography, ClickAwayListener } from "@mui/material";
import React, { useState } from "react";
import Img from "../../assets/E-Wallet-pana.svg";
import { Add } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import { ProductDetailsResponse } from "../../api/product/getProductDetail";
import ProductDetail from "../product/ProductDetail";

interface ProductPopoverProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  productName: string;
  productDetails:ProductDetailsResponse
}

const ProductPopover: React.FC<ProductPopoverProps> = ({
  anchorEl,
  handleClose,
  productName,
  productDetails,
}) => {
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const id = open ? "product-popover" : undefined;
  const [startX, setStartX] = useState<number | null>(null);

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    console.log(`${productName} added to the cart`);
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    setStartX(event.touches[0].clientX);
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (startX !== null) {
      const endX = event.changedTouches[0].clientX;
      const diffX = startX - endX;

      if (Math.abs(diffX) > 50) { // سواپ به چپ یا راست
        handleClose();
      }
    }
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        slotProps={{
          paper: {
            sx: { width: "90vw" },
          },
        }}
        sx={{ width: "100%" }}
        onClick={() => navigate(`/products/${productDetails.barcode}`)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Box className="w-full flex p-3">
          <img src={Img} height={60} width={60} style={{ borderRadius: "8px" }} alt="Product" />
          <Box width={"100%"} className="flex flex-col justify-between px-4">
            <Box className="w-full flex justify-between">
              <Typography variant="body1" fontWeight={"bold"}>
              {productDetails.name}
              </Typography>
            </Box>
            <Box className="w-full flex justify-between items-center">
              <Typography>{productDetails.price} تومان</Typography>
            </Box>
          </Box>
          <Box className="w-full flex flex-col items-end">
            <Button variant="contained" onClick={handleAddToCart}>
              <Add size={40} />
            </Button>
          </Box>
        </Box>
      </Popover>
    </ClickAwayListener>
  );
};

export default ProductPopover;
