import { Box, Button, Paper, Typography } from "@mui/material";
import { Add } from "iconsax-react";
import { useNavigate } from "react-router-dom";

type SearchItemProps = {
  item: {
    id: string;
    image: string;
    name: string;
    amount: number;
  };
};

const SearchItem = ({ item }: SearchItemProps) => {
  const navigate = useNavigate();

  return (
    <Box
      component={Paper}
      className="w-full flex p-3"
      onClick={() => navigate(`/products/${item.id}`)}
    >
      <img
        src={item.image}
        height={60}
        width={60}
        style={{ borderRadius: "8px" }}
      />
      <Box width={"100%"} className="flex justify-between px-4">
        <Box className="flex h-full flex-col justify-between">
          <Typography variant="body1" fontWeight={"bold"}>
            {item.name}
          </Typography>
          <Typography>{item.amount.toLocaleString()} تومان</Typography>
        </Box>
      </Box>
      <Box className="flex justify-between items-center">
        <Button
          endIcon={<Add />}
          variant="contained"
          onClick={(e) => e.stopPropagation()} // جلوگیری از رفتن به صفحه جزئیات
        >
          افزودن
        </Button>
      </Box>
    </Box>
  );
};

export default SearchItem;
    