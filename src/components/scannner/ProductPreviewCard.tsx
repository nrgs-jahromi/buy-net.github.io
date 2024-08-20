import { Box, Button, IconButton, Popover, Typography } from "@mui/material";
import React from "react";
import Img from "../../assets/E-Wallet-pana.svg";
import { Add, InfoCircle } from "iconsax-react";
import { useNavigate } from "react-router-dom";

interface ProductPopoverProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  productName: string;
}

const ProductPopover: React.FC<ProductPopoverProps> = ({
  anchorEl,
  handleClose,
  productName,
}) => {
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const id = open ? "product-popover" : undefined;

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent the popover click event from triggering navigation
    event.stopPropagation();
    console.log(`${productName} added to the cart`);
  };

  return (
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
      onClick={() => navigate(`/products/${productName}`)}
    >
      <Box className="w-full flex p-3">
        <img src={Img} height={60} width={60} style={{ borderRadius: "8px" }} alt="Product" />
        <Box width={"100%"} className="flex flex-col justify-between px-4">
          <Box className="w-full flex justify-between">
            <Typography variant="body1" fontWeight={"bold"}>
            {/* <IconButton  size="small">
              <InfoCircle/>
            </IconButton> */}
              {productName}
            </Typography>
          </Box>
          <Box className="w-full flex justify-between items-center">
            <Typography>130,000,000 تومان</Typography>{" "}
          </Box>
        </Box>
        <Box className="w-full flex flex-col items-end">
          <Button variant="contained" onClick={handleAddToCart}>
            <Add size={40} />
          </Button>
        </Box>
      </Box>
    </Popover>
  );
};

export default ProductPopover;
