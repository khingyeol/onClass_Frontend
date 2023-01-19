import { alpha, Box } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { onClassColorTheme } from "./theme/onClassColorTheme";

interface OCIconButtonProps {
  icon: any;
  color: string; // Color Code/onClassColorTheme
  size: string; // px
  // href?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  type?: "square" | "circle";
  disabled?: boolean;
}

const OCIconButton: FC<OCIconButtonProps> = (props) => {
  const { icon, color, size, onClick, type = "circle", disabled = false } = props;

  // https://codepen.io/sosuke/pen/Pjoqqp
  const greenFilter =
    "invert(55%) sepia(60%) saturate(366%) hue-rotate(114deg) brightness(96%) contrast(93%)";
  const greyFilter =
    "invert(56%) sepia(7%) saturate(12%) hue-rotate(51deg) brightness(97%) contrast(92%)";
  const grey50Filter =
    "invert(100%) sepia(0%) saturate(6006%) hue-rotate(24deg) brightness(113%) contrast(50%)";

  const hoverStyle = {
    ":hover": {
      backgroundColor: alpha(color, 0.3),
    },
  }

  const disabledStyle = {
    backgroundColor: alpha(color, 0.05)
  }

  return (
    <Box
      width={size}
      height={size}
      borderRadius={type === "circle" ? size : "25%"}
      bgcolor={alpha(color, 0.1)}
      position="relative"
      onClick={onClick}
      // onClick={() => href && navigate(href)}
      sx={{
        cursor: `${onClick && "pointer"}`,
        ...(onClick && hoverStyle),
        ...(disabled && disabledStyle)
      }}
      // flex="initial"
    >
      <img
        width="50%"
        height="50%"
        src={icon}
        alt="icon-button"
        style={{
          opacity:`${disabled ? "50%" : "100%"}`,
          objectFit: "fill",
          position: "absolute",
          top: "50%",
          left: "50%",
          marginLeft: "-25%",
          marginTop: "-25%",
          verticalAlign: "middle",
          filter: `${
            color === onClassColorTheme.green
              ? greenFilter
              : color === onClassColorTheme.grey
              ? greyFilter
              : color === onClassColorTheme.grey50
              ? grey50Filter
              : ""
          }`,
        }}
      />
    </Box>
  );
};

export default OCIconButton;
