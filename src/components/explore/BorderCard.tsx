import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

type BorderCardProps = {
  item: {
    id: string;
    img: string;
  };
};

const BorderCard = ({ item }: BorderCardProps) => {
  const navigate = useNavigate();

  return (
    <Box>
      <img
        src={item.img}
        onClick={() => navigate(item.id)}
        style={{ cursor: "pointer" }}
      />
    </Box>
  );
};

export default BorderCard;
