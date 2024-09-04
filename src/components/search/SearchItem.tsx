import { Box, Button, Paper, Typography } from "@mui/material";
import { Add } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import theme from "../../theme";
import { ProductData } from "../../api/product/getProductsList";
import { FC } from "react";
import { API_BASE_URL } from "../../api/config";
import img1 from "../../assets/DefaultImage.png";

type SearchItemProps = {
  item: ProductData;
};

const SearchItem: FC<SearchItemProps> = ({ item }) => {
  const navigate = useNavigate();

  return (
    <Box
      component={Paper}
      className="w-full flex p-3 gap-4"
      onClick={() => navigate(`/products/${item.barcode}`)}
      sx={{
        borderRadius: "8px",
        display: "flex",
        alignItems: "end",
      }}
    >
      <Box
        sx={{
          width: 90,
          minWidth: 90,
          height: 90,
          borderRadius: "8px",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={item.primary_image_url ? API_BASE_URL + item.primary_image_url : img1}
          alt={item.name}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
          }}
        />
      </Box>

      <Box width={"100%"} height={90} className="flex  flex-col justify-between">
        <Typography variant="body2" fontWeight={"bold"}>
          {item.name}
        </Typography>
        <Box className="flex justify-between">
          <Typography variant="body2">{item.stock?.toLocaleString()} تومان</Typography>
          <Button
            startIcon={<Add />}
            size="small"
            variant="contained"
            onClick={(e) => e.stopPropagation()}
          >
            افزودن
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SearchItem;
