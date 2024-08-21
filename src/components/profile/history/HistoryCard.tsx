import { Box, Paper, Typography, Avatar } from "@mui/material";
import { FC } from "react";

interface HistoryCardProps {
  storeImage: string;
  storeName: string;
  dateTime: string;
  amount: string;
  onViewInvoice: () => void;
}

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
        src={storeImage}
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
          <Typography variant="caption">{dateTime}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default HistoryCard;
