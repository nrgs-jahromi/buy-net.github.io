// ProductPopover.tsx
import { Box, Popover, Typography } from "@mui/material";
import React from "react";
import Img from "../../assets/E-Wallet-pana.svg"
interface ProductPopoverProps {
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  productName: string;
}

const ProductPopover: React.FC<ProductPopoverProps> = ({ anchorEl, handleClose, productName }) => {
  const open = Boolean(anchorEl);
  const id = open ? "product-popover" : undefined;

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
      sx={{width:"100%"}}
    >

<Box className="w-full  flex p-3">
      <img
        src={Img}
        height={60}
        width={60}
        style={{ borderRadius: "8px" }}
      />
      <Box width={"100%"} className="flex flex-col justify-between px-4 ">
        <Box className="w-full flex justify-between">
          <Typography variant="body1" fontWeight={"bold"}>
            مداد رنگی
          </Typography>
          {/* <Typography> مشاهده فاکتور</Typography> */}
        </Box>
        <Box className="w-full flex justify-between items-center">
          <Typography>130,000,000</Typography>{" "}
          <Typography variant="caption">نمیدونم </Typography>
        </Box>
      </Box>
    </Box>
    </Popover>
  );
};

export default ProductPopover;
