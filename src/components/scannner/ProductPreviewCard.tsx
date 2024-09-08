import {
  Box,
  Button,
  Popover,
  Typography,
  ClickAwayListener,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Img from "../../assets/scangray.svg";
import { Add } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import { ProductDetailsResponse } from "../../api/product/getProductDetail";
import ProductDetail from "../product/ProductDetail";
import { useAddToCart } from "../../api/cart/addToCart";
import { notif } from "../common/notification/Notification";
import { API_BASE_URL } from "../../api/config";

interface ProductPopoverProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  productName: string;
  productDetails: ProductDetailsResponse;
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
  const store_id = localStorage.getItem("storeId");
  const { mutate: addToCart, isSuccess, isError } = useAddToCart();

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (productDetails.barcode && store_id && productDetails) {
      addToCart({
        params: { storeId: store_id },
        body: [{ barcode: productDetails.barcode, quantity: 1 }],
      });
    }
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    setStartX(event.touches[0].clientX);
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (startX !== null) {
      const endX = event.changedTouches[0].clientX;
      const diffX = startX - endX;

      if (Math.abs(diffX) > 50) {
        // سواپ به چپ یا راست
        handleClose();
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      notif(`${productDetails?.name} با موفقیت به سبد خرید شما اضافه شد.`, {
        variant: "success",
      });
    } else if (isError) {
      notif("مشکلی در ثبت کالا وجود دارد لطفا بعدا تلاش کنید.", {
        variant: "error",
      });
    }
  }, [isSuccess, isError]);

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
          <img
            src={productDetails.primary_image? API_BASE_URL+productDetails.primary_image.image : Img}
            height={60}
            width={60}
            style={{ borderRadius: "8px" }}
            alt="Product"
          />
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
            <Button
              variant="contained"
              onClick={handleAddToCart}
              disabled={productDetails.stock === 0}
            >
              <Add size={40} />
            </Button>
          </Box>
        </Box>
      </Popover>
    </ClickAwayListener>
  );
};

export default ProductPopover;
