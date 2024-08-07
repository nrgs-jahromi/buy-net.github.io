import React from "react";
import Slider from "react-slick";
import { Box, Typography, Button } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../assets/E-Wallet-pana (1).svg";
import img2 from "../../assets/QR Code-amico.svg";
import img3 from "../../assets/Add to Cart-amico.svg";

const ProductDetail = () => {
  const images = [img1, img2, img3];

  const settings = {
    customPaging: function (i: any) {
      return (
        <a>
          <img
            src={images[i]}
            alt={`thumbnail-${i}`}
            style={{ width: "50px", height: "50px" }}
          />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "400px",
            }}
          >
            <img
              src={image}
              alt={`product-${index}`}
              style={{ width: "100%", maxHeight: "100%" }}
            />
          </Box>
        ))}
      </Slider>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 8 }}>
        <Box>
          <Typography variant="subtitle1" color="textSecondary">
            لوازم التحریر / دفتر / فنری
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            نام محصول
          </Typography>
          <Typography variant="body2" >
        محل قرار گیری در فروشگاه
      </Typography>
        </Box>
        <Box>
          <Box className="flex flex-col justify-end text-left">
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ textDecoration: "line-through" }}
            >
              130,000
            </Typography>
            <Typography variant="body1" fontWeight={"bold"}>
              119,000 <span style={{ fontSize: "12px" }}>تومان</span>
            </Typography>
          </Box><Button variant="contained" color="primary" fullWidth sx={{mt:4}}>
        افزودن به سبد خرید
      </Button>
        </Box>
      </Box>
    
      
      <Typography variant="body1" sx={{ marginTop: 2 }}>
        توضیحات محصول: این بخش شامل توضیحات کامل محصول می‌باشد که می‌تواند شامل
        ویژگی‌ها، مزایا و سایر اطلاعات مرتبط باشد.
      </Typography>
    </Box>
  );
};

export default ProductDetail;
