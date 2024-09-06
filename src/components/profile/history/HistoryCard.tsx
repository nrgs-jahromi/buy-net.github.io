import { Box, Paper, Typography, Avatar } from "@mui/material";
import { FC } from "react";
import { API_BASE_URL } from "../../../api/config";
import dayjs from "dayjs";
import jalaliday from "jalaliday";

dayjs.extend(jalaliday);

interface HistoryCardProps {
  storeImage: string;
  storeName: string;
  dateTime: string;
  amount: string;
  onViewInvoice: () => void;
}

const formatDateTime = (dateTime: string) => {
  return dayjs(dateTime).calendar('jalali').format('YYYY/MM/DD - HH:mm');
};

const HistoryCard: FC<HistoryCardProps> = ({
  storeImage,
  amount,
  storeName,
  dateTime,
  onViewInvoice,
}) => {
  return (
    <Box
      component={Paper}
      className="w-full flex p-3"
      elevation={3}
      onClick={onViewInvoice}
      sx={{ cursor: "pointer" }}
    >
      <Avatar
        src={API_BASE_URL + storeImage}
        alt={storeName}
        sx={{ width: 60, height: 60, borderRadius: "8px" }}
      />
      <Box width={"100%"} className="flex flex-col justify-between px-4">
        <Box className="w-full flex justify-between items-center">
          <Typography variant="body1" fontWeight={"bold"}>
            {storeName}
          </Typography>
        </Box>
        <Box className="w-full flex justify-between items-center">
          <Typography>{amount}</Typography>
          <Typography variant="caption">{formatDateTime(dateTime)}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default HistoryCard;
