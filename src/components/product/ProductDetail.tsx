import React from "react";
import Slider from "react-slick";
import { Box, Typography, Button, Divider } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../assets/DefaultImage.png";
import { useProductDetails } from "../../api/product/getProductDetail";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../api/config";
import { useAddToCart } from "../../api/cart/addToCart";

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const store_id = localStorage.getItem("storeId");

  const { data: productDetails } = useProductDetails(store_id!, productId!);
  const { mutate: addToCart } = useAddToCart();

  const images =
    productDetails && productDetails.images && productDetails.images.length > 0
      ? productDetails.images.map((image) => API_BASE_URL + image.image)
      : [img1];

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
    dots: images.length > 1,
    dotsClass: "slick-dots slick-thumb",
    infinite: images.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const discountPercentage = productDetails?.discount?.discount_percentage || 0;

  const discountedPrice =
    productDetails?.price && discountPercentage > 0
      ? Number(productDetails.price) -
        (Number(productDetails.price) * discountPercentage) / 100
      : productDetails?.price;

  const handleAddToCart = () => {
    if (productId && store_id && productDetails) {
      addToCart({
        params: { storeId: store_id },
        body: [{ barcode: productId, quantity: 1 }],
      });
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <Box key={index} position="relative">
            <img
              src={image}
              alt={`product-${index}`}
              style={{
                width: "100%",
                maxHeight: "300px",
                objectFit: "contain",
                borderRadius: "8px",
                padding: 4,
                transition: "filter 0.3s ease-in-out",
              }}
            />
          </Box>
        ))}
      </Slider>

      <Divider sx={{ mt: 6 }} />
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Box>
          <Typography variant="subtitle1" color="textSecondary">
            {productDetails && productDetails?.categories?.length > 0
              ? productDetails.categories.join(" / ")
              : "بدون دسته‌بندی"}
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            {productDetails?.name}
          </Typography>
          <Typography variant="body2">{productDetails?.location}</Typography>
        </Box>
        <Box>
          <Box className="flex flex-col justify-start text-left">
            <Box display="flex" className="w-full justify-end gap-3">
              {discountPercentage > 0 && (
                <Typography
                  variant="body1"
                  color="error"
                  align="left"
                  fontWeight={"bold"}
                >
                  {discountPercentage}%
                </Typography>
              )}
              <Typography
                variant="body1"
                color="textSecondary"
                sx={{ textDecoration: "line-through" }}
              >
                {productDetails?.price}
              </Typography>
            </Box>
            <Typography variant="body1" fontWeight={"bold"}>
              {discountedPrice?.toLocaleString()}{" "}
              <span style={{ fontSize: "12px" }}>تومان</span>
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 4 }}
            onClick={handleAddToCart} // افزودن این تابع به دکمه
          >
            افزودن به سبد خرید
          </Button>
        </Box>
      </Box>

      <Typography variant="body1" sx={{ marginTop: 2 }}>
        {productDetails?.description}
      </Typography>
    </Box>
  );
};

export default ProductDetail;
