import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Box, Typography, Button, Divider } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../assets/scangray.svg";
import { useProductDetails } from "../../api/product/getProductDetail";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../api/config";
import { useAddToCart } from "../../api/cart/addToCart";
import { notif } from "../common/notification/Notification";
import dayjs from "dayjs";
import theme from "../../theme";

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const store_id = localStorage.getItem("storeId");

  const { data: productDetails } = useProductDetails(store_id!, productId!);
  const { mutate: addToCart, isSuccess, isError } = useAddToCart();
  const expirationDate = productDetails?.discount?.expiration_date;
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [isDiscountExpired, setIsDiscountExpired] = useState<boolean>(false);

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
        setIsDiscountExpired(false);
      } else {
        setTimeLeft("00:00:00:00");
        setIsDiscountExpired(true);
      }
    };

    calculateTimeLeft();

    const timer = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    return () => clearInterval(timer);
  }, [expirationDate]);

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
            style={{ width: "60px", aspectRatio: "1/1" }}
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
    productDetails?.price && discountPercentage > 0 && !isDiscountExpired
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

  useEffect(() => {
    if (isSuccess) {
      notif(`${productDetails?.name} با موفقیت به سبد خرید شما اضافه شد.`, {
        variant: "success",
      });
    } else if (isError) {
      notif("مشکلی در ثبت کالا وجود دارد لطفا بعدا تلاش کنید.", {
        variant: "error",
      });
    }
  }, [isSuccess, isError]);

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
                aspectRatio: "1/1",
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
          <Typography variant="body2" color={theme.palette.primary.main}>{productDetails?.brand}</Typography>
          <Typography variant="body2">محل قرارگیری: {productDetails?.location || "نامشحص"}</Typography>
        </Box>
        <Box>
            <Box className="flex flex-col justify-start text-left">
          {discountPercentage > 0 && timeLeft !== "00:00:00:00" &&(
              <Box display="flex" className="w-full justify-end gap-3">
                {expirationDate && (
                  <Typography
                    variant="body2"
                    color="error"
                    align="left"
                    fontWeight={"bold"}
                  >
                    {timeLeft}
                  </Typography>
                )}
                <Typography
                  variant="body1"
                  color="error"
                  align="left"
                  fontWeight={"bold"}
                >
                  {discountPercentage}%
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{
                    textDecoration: "line-through",
                  }}
                >
                  {productDetails?.price}
                </Typography>
              </Box>
             
          )} <Typography variant="h6" fontWeight={"bold"}>
                {discountedPrice?.toLocaleString()}{" "}
                <span style={{ fontSize: "12px" }}>تومان</span>
              </Typography>
            </Box>
        </Box>
      </Box>

      <Typography variant="body1" sx={{ marginTop: 2 }}>
        {productDetails?.description}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 4 }}
        disabled={productDetails?.stock === 0}
        onClick={handleAddToCart}
      >
        {productDetails?.stock === 0 ? "عدم موجودی" : "افزودن به سبد خرید"}
      </Button>
    </Box>
  );
};

export default ProductDetail;
