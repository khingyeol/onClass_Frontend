import { alpha, Box } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { onClassColorTheme } from "./theme/onClassColorTheme";

interface OCIconButtonProps {
  icon: any;
  color: string;
  size: string;
  href?: string;
}

const OCIconButton: FC<OCIconButtonProps> = (props) => {
  const { icon, color, size, href } = props;
  const navigate = useNavigate();

  // https://codepen.io/sosuke/pen/Pjoqqp
  const greenFilter =
    "invert(55%) sepia(60%) saturate(366%) hue-rotate(114deg) brightness(96%) contrast(93%)";
  const greyFilter =
    "invert(56%) sepia(7%) saturate(12%) hue-rotate(51deg) brightness(97%) contrast(92%)";
  const grey50Filter = 
  "invert(100%) sepia(0%) saturate(6006%) hue-rotate(24deg) brightness(113%) contrast(50%)"

  return (
    <Box
      width={size}
      height={size}
      borderRadius={size}
      bgcolor={alpha(color, 0.1)}
      position="relative"
      onClick={() => href && navigate(href)}
      sx={{ cursor: `${href && "pointer"}` }}
      // flex="initial"
    >
      <img
        width="50%"
        height="50%"
        src={icon}
        alt="icon-button"
        style={{
          objectFit: "fill",
          position: "absolute",
          top: "50%",
          left: "50%",
          marginLeft: "-25%",
          marginTop: "-25%",
          verticalAlign: "middle",
          filter: `${color === onClassColorTheme.green ? greenFilter
                    : color === onClassColorTheme.grey ? greyFilter 
                    : color === onClassColorTheme.grey50 ? grey50Filter
                    : ""}`,
        }}
      />
    </Box>
  );
};

export default OCIconButton;
