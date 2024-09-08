import { useEffect, useState } from "react";
import { Box, Paper, Typography, Chip } from "@mui/material";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import img from "../../assets/DefaultImage.png";
import { API_BASE_URL } from "../../api/config";
import theme from "../../theme";
import { ProductT } from "../../api/explore/getSpecials";
import { useNavigate } from "react-router-dom";

dayjs.extend(duration);

interface ProductCardProps {
  product: ProductT;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate=useNavigate()
  const expirationDate = product.discount?.expiration_date;
  const [timeLeft, setTimeLeft] = useState<string>("");
  const originalPrice = product.price;
  const discountPercentage = product.discount?.discount_percentage || 0;

  // محاسبه قیمت تخفیف خورده
  const discountedPrice = originalPrice
    ? originalPrice - (originalPrice * discountPercentage) / 100
    : 0;

  useEffect(() => {
    if (!expirationDate) return;

    const calculateTimeLeft = () => {
      const expiration = dayjs(expirationDate);
      const now = dayjs();
      const diff = expiration.diff(now);

      if (diff > 0) {
        const duration = dayjs.duration(diff);
        const days = String(duration.days()).padStart(2, "0");
        const hours = String(duration.hours()).padStart(2, "0");
        const minutes = String(duration.minutes()).padStart(2, "0");
        const seconds = String(duration.seconds()).padStart(2, "0");

        setTimeLeft(`${days}:${hours}:${minutes}:${seconds}`);
      } else {
        setTimeLeft("00:00:00:00");
      }
    };

    calculateTimeLeft();

    const timer = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    return () => clearInterval(timer);
  }, [expirationDate]);

  return (
    <Box
      component={Paper}
      className="flex flex-col items-center"
      sx={{
        minWidth: "150px",
        maxWidth: "150px",
        height: 300,
        position: "relative",
        borderRadius: "8px",
        padding: "8px",
        border: "none",
      }}
      onClick={()=>navigate(`/products/${product.barcode}`)}
    >
      <img
        src={
          product.primary_image_url
            ? API_BASE_URL + product.primary_image_url
            : img
        }
        width="100%"
        style={{ aspectRatio: "1/1", borderRadius: "8px" }}
      />

      <Typography
        variant="body2"
        fontSize={"14px"}
        sx={{ marginTop: "8px" }}
        align="right"
        width={"100%"}
      >
        {product.name}
      </Typography>

      <Box className="flex w-full justify-between ">
        {discountPercentage > 0 && (
          <Chip
            label={`${discountPercentage}%`}
            sx={{
              backgroundColor: theme.palette.error.main,
              color: "white",
              fontSize: "12px",
              marginTop: "4px",
            }}
            size="small"
          />
        )}

        <Box className="flex flex-col justify-start text-left">
         <Typography variant="body1" fontWeight={"bold"}>
            {discountedPrice?.toLocaleString()} <span style={{ fontSize: "10px" }}>تومان</span>
          </Typography> {discountPercentage > 0 && timeLeft !== "00:00:00:00" && (
            <Box
              display="flex"
              className="w-full justify-end gap-3 items-center"
            >
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{
                  textDecoration: "line-through",
                }}
              >
                {originalPrice?.toLocaleString()} 
              </Typography>
            </Box>
          )}

          
        </Box>
      </Box>

      {expirationDate && (
        <Typography
          variant="body2"
          color={"#EF4056"}
          sx={{
            position: "absolute",
            bottom: "8px",
            left: "8px",
            backgroundColor: theme.palette.background.paper,
            padding: "2px 8px",
            borderRadius: "4px",
          }}
        >
          {timeLeft}
        </Typography>
      )}
    </Box>
  );
};

export default ProductCard;
