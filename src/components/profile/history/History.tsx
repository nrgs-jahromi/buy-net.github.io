import { Box, Paper, Typography } from "@mui/material";
import img1 from "../../../assets/E-Wallet-pana.svg";
import storeImage from "../../../assets/QR Code-amico.svg"; 
import HistoryCard from "./HistoryCard";
import koroshLogo from "../../../assets/temp logo/logo.png" 
import hyperme from "../../../assets/temp logo/images.jpg" 
import mackdonald from "../../../assets/temp logo/mackdonald.jpg" 
const reports = [
  {
    img: img1,
    value: 40,
    description: "ساعت خرید با بای‌نت",
  },
  {
    img: img1,
    value: 10,
    description: " خرید با بای‌نت",
  },
  {
    img: img1,
    value: 40,
    description: "تومان تخفیف با بای‌نت",
  },
];

const purchases = [
  {
    storeImage: hyperme,
    storeName: "فروشگاه ۱",
    dateTime: "1403/05/15 14:30",
    amount: "500,000 تومان",
  },
  {
    storeImage: koroshLogo,
    storeName: "فروشگاه ۲",
    dateTime: "1403/05/16 10:00",
    amount: "150,000 تومان",
  },
  {
    storeImage: mackdonald,
    storeName: "فروشگاه ۳",
    dateTime: "1403/05/17 16:45",
    amount: "300,000 تومان",
  },
];
const History = () => {
  return (
    <Box className="w-full p-6 space-y-4">
      <Box
        component={Paper}
        className="w-full flex justify-between items-center p-4 gap-5"
      >
        {reports.map((report, index) => (
          <Box className="flex flex-col justify-center items-center">
            <img src={report.img} height={60} width={60} />
            <Typography variant="body1" fontWeight={"bold"}>
              {report.value}
            </Typography>
            <Typography
              variant="body2"
              align="center"
              sx={{ whiteSpace: "wrap" }}
            >
              {report.description}
            </Typography>
          </Box>
        ))}
      </Box>
      {purchases.map((purchase , index)=>(
        <HistoryCard
        key={index}
        storeImage={purchase.storeImage}
        storeName={purchase.storeName}
        dateTime={purchase.dateTime}
        amount={purchase.amount}
      />
      ))}
    </Box>
  );
};
export default History;
