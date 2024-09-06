import { useEffect, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import img from "../../assets/DefaultImage.png";
import { API_BASE_URL } from "../../api/config";
import theme from "../../theme";
import { ProductT } from "../../api/explore/getSpecials";

dayjs.extend(duration);

interface ProductCardProps {
  product: ProductT;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const expirationDate = product.discount?.expiration_date;
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    if (!expirationDate) return;

    const calculateTimeLeft = () => {
      const expiration = dayjs(expirationDate);
      const now = dayjs();
      const diff = expiration.diff(now);

      if (diff > 0) {
        const duration = dayjs.duration(diff);
        const days = String(duration.days()).padStart(2, '0');
        const hours = String(duration.hours()).padStart(2, '0');
        const minutes = String(duration.minutes()).padStart(2, '0');
        const seconds = String(duration.seconds()).padStart(2, '0');

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
        minWidth: "25vw",
        minHeight:150,
        position: "relative",
        borderRadius: "8px",
        padding: "8px",
      }}
    >
      {product.discount && product.discount?.discount_percentage > 0 && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 0,
            height: 0,
            borderLeft: "50px solid red",
            borderBottom: "50px solid transparent",
            zIndex: 1,
          }}
        >
          <Typography
            sx={{
              position: "absolute",
              top: "5px",
              left: "5px",
              color: "white",
              fontSize: "12px",
              fontWeight: "bold",
              ml:-6
            }}
          >
            {product.discount.discount_percentage}%
          </Typography>
        </Box>
      )}

      <img
        src={product.primary_image_url?API_BASE_URL + product.primary_image_url : img}
        width="100%"
        style={{ aspectRatio: "16 / 9", borderRadius: "8px" }}
      />

      <Typography variant="body2" fontWeight={"bold"} sx={{ marginTop: "8px" }}>
        {product.name}
      </Typography>

      {expirationDate && (
        <Typography
          variant="body2"
          color={theme.palette.warning.main}
          sx={{ marginTop: "4px" }}
        >
           {timeLeft}
        </Typography>
      )}
    </Box>
  );
};

export default ProductCard;
