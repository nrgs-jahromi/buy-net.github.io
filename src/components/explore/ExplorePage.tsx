import { Box, Button, Paper, Typography } from "@mui/material";
import logo from "../../assets/temp logo/logo.png";
import theme from "../../theme";
import { ArrowLeft2 } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import img from "../../assets/DefaultImage.png";
import { useBanners } from "../../api/explore/getBanners";
import { API_BASE_URL } from "../../api/config";
import { useTopDiscountedProducts } from "../../api/explore/getSpecials";
import { useRecommendedProducts } from "../../api/explore/getRecommendedList";
import ProductCard from "./ProductCard";
import img2 from "../../assets/pngtree-cart-with-sale-items-png-image_12624062_prev_ui.png";

const ExplorePage = () => {
  const navigate = useNavigate();
  const store_id = localStorage.getItem("storeId");

  const { data: banners, isLoading, isError } = useBanners(store_id!);
  const {
    data: discountedProducts,
    isLoading: discountedProductsLoading,
    isError: discountedProductsError,
  } = useTopDiscountedProducts(store_id!);
  const {
    data: recommendedProducts,
    isLoading: recommendedProductsLoading,
    isError: recommendedProductsError,
  } = useRecommendedProducts(store_id!);

  const combinedProducts = [
    ...(discountedProducts?.top_discounted_products || []),
    ...(discountedProducts?.expiring_soon_products || []),
  ];
  
  const settings = {
    dots: false,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Box className="p-8 space-y-3">
      <Box className="flex justify-start gap-4 items-center" height={90}>
        <img
          src={API_BASE_URL + localStorage.getItem("storeIcon") || logo}
          height={90}
          width={90}
          style={{ borderRadius: "50%" }}
        />
        <Typography
          variant="h5"
          fontWeight={"bold"}
          color={theme.palette.primary.main}
        >
          {localStorage.getItem("storeName")}
        </Typography>
      </Box>

      {isLoading ? (
        <Typography>در حال بارگذاری...</Typography>
      ) : isError ? (
        <Typography>خطایی رخ داده است</Typography>
      ) : banners?.length > 1 ? (
        <Slider {...settings}>
          {banners.map((banner, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                aspectRatio: "16 / 9",
                borderRadius: "16px",
              }}
              onClick={() => navigate(`/products/${banner.product_barcode}`)}
            >
              <img
                src={API_BASE_URL + banner.image_url || img}
                alt="بنر تبلیغاتی"
                style={{
                  cursor: "pointer",
                  borderRadius: "16px",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          ))}
        </Slider>
      ) : banners?.length === 1 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            aspectRatio: "16 / 9",
            borderRadius: "16px",
          }}
          onClick={() => navigate(`/products/${banners[0].product_barcode}`)}
        >
          <img
            src={API_BASE_URL + banners[0].image_url || img}
            alt="بنر تبلیغاتی"
            style={{
              cursor: "pointer",
              borderRadius: "16px",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
      ) : (
        <Typography>هیچ بنری یافت نشد</Typography>
      )}

      {discountedProductsLoading ? (
        <Typography>در حال بارگذاری محصولات...</Typography>
      ) : discountedProductsError ? (
        <Typography>خطایی در بارگذاری محصولات رخ داده است</Typography>
      ) : combinedProducts.length > 0 ? (
        <Box
          className="w-dvw flex gap-1 overflow-auto p-8 -mx-8"
          bgcolor={theme.palette.primary.main}
        >
          <Box
            className="flex flex-col items-center gap-10"
            sx={{
              minWidth: "150px",
              maxWidth: "150px",
              height: 300,
              position: "relative",
              borderRadius: "8px",
            }}
          >
            <Typography
              variant="h4"
              fontWeight={"bold"}
              color={"white"}
              align="justify"
            >
              پیشنهاد شگفت انگیز
            </Typography>
            <img src={img2} style={{ marginLeft: "30%" }} width={"90%"}></img>
          </Box>
          {combinedProducts.map((product, index) => (
            <ProductCard product={product} />
          ))}
        </Box>
      ) : (
        <Typography>هیچ محصولی یافت نشد</Typography>
      )}

      <Box className="flex w-full items-center justify-between ">
        <Typography variant="h6" fontWeight={"bold"}>
          برای شما
        </Typography>
        <Button
          size="small"
          sx={{ color: theme.palette.grey[400] }}
          endIcon={<ArrowLeft2 size={16} />}
        >
          مشاهده همه
        </Button>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          gap: 1.5,
        }}
      >
        {recommendedProducts?.map((product, index) => (
          <Box
            key={index}
            onClick={() => navigate(`/products/${product.barcode}`)}
            sx={{
              width: "100%",
              aspectRatio: "1/1",
              overflow: "hidden",
              borderRadius: "8px",

              border: "1px solid #e0e0e0",
            }}
            
          >
            <img
              src={
                product.primary_image_url
                  ? API_BASE_URL + product.primary_image_url
                  : img
              }
              alt={product.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                // borderRadius: "16px",
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ExplorePage;
