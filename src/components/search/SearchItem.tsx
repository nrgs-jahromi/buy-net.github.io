import { Box, Button, Paper, Typography } from "@mui/material";
import { Add } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import theme from "../../theme";
import { ProductData } from "../../api/product/getProductsList";
import { FC } from "react";
import { API_BASE_URL } from "../../api/config";

type SearchItemProps = {
  item: ProductData
};

const SearchItem :FC<SearchItemProps>= ({ item }) => {
  const navigate = useNavigate();

  return (
    <Box
      component={Paper}
      className="w-full flex p-3 gap-4"
      onClick={() => navigate(`/products/${item.barcode}`)}
      sx={{
        // boxShadow: `2px 4px 8px ${theme.palette.grey[300]}`, // تنظیم سایه با مقدار تاری مناسب
        borderRadius: '8px', // برای گرد کردن گوشه‌ها
        display: 'flex',
        alignItems: 'end', // برای وسط‌چین کردن محتویات
      }}
    >
      <Box
        sx={{
          width: 90,
          minWidth:90,
          height: 90,
          borderRadius: '8px',
          overflow: 'hidden', // پنهان کردن نواحی اضافی تصویر
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // border:`0.5px solid ${theme.palette.grey[300]}`
        }}
      >
        <img
          src={API_BASE_URL+item.primary_image_url}
          alt={item.name}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain', // حفظ نسبت ابعاد تصویر و فیت کردن تصویر در کادر
          }}
        />
      </Box>
      {/* <Box width={"100%"} className="flex justify-between px-4 h-full"> */}
        <Box width={"100%"} height={90} className="flex  flex-col justify-between">
          <Typography variant="body2" fontWeight={"bold"}>
            {item.name}
          </Typography> <Box className="flex justify-between ">
          <Typography variant="body2">{item.stock?.toLocaleString()} تومان</Typography>
        <Button
          startIcon={<Add />}
          size="small"
          variant="contained"
          onClick={(e) => e.stopPropagation()} // جلوگیری از رفتن به صفحه جزئیات
        >
          افزودن
        </Button>
      </Box>
        </Box>
      {/* </Box> */}
     
    </Box>
  );
};

export default SearchItem;
