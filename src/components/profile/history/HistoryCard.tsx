import { Box, Paper, Typography } from "@mui/material";
import { FC } from "react";

interface HistoryCardProps {
  storeImage: string;
  storeName: string;
  dateTime: string;
  amount: string;
}
const HistoryCard: FC<HistoryCardProps> = ({
  storeImage,
  amount,
  storeName,
  dateTime,
}) => {
  return (
    <Box component={Paper} className="w-full flex p-3">
      <img
        src={storeImage}
        height={60}
        width={60}
        style={{ borderRadius: "8px" }}
      />
      <Box width={"100%"} className="flex flex-col justify-between px-4 ">
        <Box className="w-full flex justify-between">
          <Typography variant="body1" fontWeight={"bold"}>
            {storeName}
          </Typography>
          {/* <Typography> مشاهده فاکتور</Typography> */}
        </Box>
        <Box className="w-full flex justify-between items-center">
          <Typography>{amount}</Typography>{" "}
          <Typography variant="caption">{dateTime}</Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default HistoryCard;
