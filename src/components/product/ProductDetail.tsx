import React from "react";
import Slider from "react-slick";
import { Box, Typography, Button, Divider } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../assets/E-Wallet-pana (1).svg";
import img2 from "../../assets/QR Code-amico.svg";
import img3 from "../../assets/Add to Cart-amico.svg";
import { useProductDetails } from "../../api/product/getProductDetail";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const images = [img1, img2, img3];
  const { productId } = useParams<{ productId: string }>();
  const store_id = localStorage.getItem("storeId");

  const {
    data: productDetails,
    isLoading,
    isError,
  } = useProductDetails(store_id!, productId! );
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
              height: "300px",
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
      <Divider sx={{ mt: 6 }} />
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Box>
          <Typography variant="subtitle1" color="textSecondary">
            لوازم التحریر / دفتر / فنری
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            {productDetails?.name}{" "}
          </Typography>
          <Typography variant="body2">{productDetails?.location}</Typography>
        </Box>
        <Box>
          <Box className="flex flex-col justify-end text-left">
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ textDecoration: "line-through" }}
            >
              {productDetails?.price}
            </Typography>
            <Typography variant="body1" fontWeight={"bold"}>
              119,000 <span style={{ fontSize: "12px" }}>تومان</span>
            </Typography>
          </Box>
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 4 }}>
            افزودن به سبد خرید
          </Button>
        </Box>
      </Box>

      <Typography variant="body1" sx={{ marginTop: 2 }}>{productDetails?.description}</Typography>
    </Box>
  );
};

export default ProductDetail;
