import { FC, ReactNode } from "react";
import { Box } from "@mui/system";

interface IconBoxProps {
  color: string;
  borderRadius: string;
  size: number;
  icon: ReactNode;
  onClick?: () => void;
}

const IconBox: FC<IconBoxProps> = ({
  color,
  borderRadius,
  size,
  icon,
  onClick,
}) => {
  return (
    <Box
      width={size}
      height={size}
      minWidth={size}
      sx={{
        cursor: "pointer",
        bgcolor: color,
        borderRadius: borderRadius,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontSize: size * 0.5, // Adjust the font size based on the icon size
      }}
      onClick={onClick}
    >
      {icon}
    </Box>
  );
};

export default IconBox;
