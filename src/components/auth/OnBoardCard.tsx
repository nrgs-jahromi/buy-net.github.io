import { Box, Typography } from "@mui/material";
import { FC } from "react";

type OnBoardDetailT = {
  cover_pic: string;
  title: string;
  description: string;
};

const OnBoardCard: FC<OnBoardDetailT> = ({ cover_pic, title, description }) => {
  return (
    <Box className="w-full flex flex-col justify-center items-center">
      <img src={cover_pic} width={"50%"} style={{marginBottom:10}}/>
      <Typography variant="h5">{title}</Typography>
      <Typography variant="body2">{description}</Typography>
    </Box>
  );
};
export default OnBoardCard;
