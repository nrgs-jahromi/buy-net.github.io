import { Box, Button, Paper, Typography } from "@mui/material";
import logo from "../../assets/temp logo/logo.png";
import theme from "../../theme";
import { ArrowLeft2 } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import Slider from "react-slick";
import img from "../../assets/DefaultImage.png"; // تصویر پیش‌فرض
import { useBanners } from "../../api/explore/getBanners";
import { API_BASE_URL } from "../../api/config";
import { useRecommendedProducts } from "../../api/explore/getSpecail";

const ExplorePage = () => {
  const navigate = useNavigate();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const store_id = localStorage.getItem("storeId");

  const { data: banners, isLoading, isError } = useBanners(store_id!);
  const {
    data: recommendedProducts,
    isLoading: recommendedProductsLoading,
    isError: recommendedProductsError,
  } = useRecommendedProducts(store_id!);

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
      <Box className="flex justify-start gap-4 items-center">
        <img
          src={API_BASE_URL + localStorage.getItem("storeIcon") || logo}
          height={70}
          width={70}
          style={{ borderRadius: "50%" }}
        />
        <Typography
          variant="h6"
          fontWeight={"bold"}
          color={theme.palette.primary.main}
        >
          {localStorage.getItem("storeName")}
        </Typography>
      </Box>

      {/* بررسی وضعیت بارگیری بنرها */}
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

      <Box className="flex w-full items-center justify-between">
        <Typography fontWeight={"bold"}>تخفیفات ویژه </Typography>
        <Button
          size="small"
          sx={{ color: theme.palette.grey[400] }}
          endIcon={<ArrowLeft2 size={16} />}
          //   onClick={() => navigate("/history")}
        >
          مشاهده همه
        </Button>
      </Box>

      <Box className="flex w-full items-center justify-between ">
        <Typography fontWeight={"bold"}>برای شما</Typography>
        <Button
          size="small"
          sx={{ color: theme.palette.grey[400] }}
          endIcon={<ArrowLeft2 size={16} />}
          //   onClick={() => navigate("/history")}
        >
          مشاهده همه
        </Button>
      </Box>
      <Box className="w-full flex gap-3 overflow-auto">
        {recommendedProducts?.map((product, index) => (
          <Box
            key={index}
            component={Paper}
            className="flex flex-col items-center"
          >
            <img
              src={API_BASE_URL + product.image_url ?? img}
              width="100%"
              // aspectRatio="16 / 9"
            />
        <Typography>{product.product_name}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ExplorePage;
