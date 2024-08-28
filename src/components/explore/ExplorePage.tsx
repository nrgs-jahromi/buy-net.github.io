import { Box, Button, Typography } from "@mui/material";
import logo from "../../assets/temp logo/logo.png";
import theme from "../../theme";
import { ArrowLeft2 } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import BorderCard from "./BorderCard";
import img from "../../assets/DefaultImage.png";
import Slider from "react-slick";
// دیتای نمونه برای کارت‌ها
const onBordData = [
  { id: "1", img: img },
  { id: "2", img: img },
  { id: "3", img: img },
];

const ExplorePage = () => {
  const navigate = useNavigate();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const settings = {
    dots: false,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const handleCardChange = (index: number) => {
    setCurrentCardIndex(index);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      handleCardChange((currentCardIndex + 1) % onBordData.length);
    },
    onSwipedRight: () => {
      handleCardChange(
        (currentCardIndex - 1 + onBordData.length) % onBordData.length
      );
    },
  });

  const handleNextCard = () => {
    handleCardChange((currentCardIndex + 1) % onBordData.length);
  };

  const handlePrevCard = () => {
    handleCardChange((currentCardIndex - 1 + onBordData.length) % onBordData.length);
  };
  useEffect(() => {
    const timer = setInterval(handleNextCard, 5000); // تغییر هر ۵ ثانیه

    return () => clearInterval(timer); // پاک‌سازی تایمر
  }, [currentCardIndex]);
  return (
    <Box className="p-8 space-y-3">
      <Box className="flex justify-start gap-4 items-center">
        <img
          src={logo}
          height={60}
          width={60}
          style={{ borderRadius: "50%" }}
        />
        <Typography
          variant="h6"
          fontWeight={"bold"}
          color={theme.palette.primary.main}
        >
          افق کوروش
        </Typography>
      </Box>
      <Slider {...settings}>
          {onBordData.map((image, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "150px",
                padding: "0 20px",
                bgcolor:theme.palette.grey[400],
                borderRadius: "16px",

              }}
              onClick={() => navigate(`products/${image.id}`)}
            >
                {image.id}
                
              {/* <img
                src={image.img}
                onClick={() => navigate(image.id)}
                style={{
                  cursor: "pointer",
                  borderRadius: "16px",
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "cover",
                }}
              /> */}
            </Box>
          ))}
        </Slider>
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
    </Box>
  );
};

export default ExplorePage;
