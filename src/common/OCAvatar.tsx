import React, { FC } from "react";
import {
  alpha,
  Avatar,
  AvatarProps,
  Theme,
  useMediaQuery,
} from "@mui/material";
import { onClassColorTheme } from "./theme/onClassColorTheme";

interface OCAvatarProps extends AvatarProps {
  src: string;
  width?: string | number;
  height?: string | number;
}

const OCAvatar: FC<OCAvatarProps> = (props) => {
  const { src, width, height, sx, ...otherProps } = props;
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));

  return (
    <Avatar
      sx={{
        ...sx,
        width: width ? width : isDesktop ? 60 : 45,
        height: height ? height : isDesktop ? 60 : 45,
        boxSizing: "border-box",
        border: "1px solid",
        borderColor: {
          xs: alpha(onClassColorTheme.darkGrey, 0.2),
          sm: alpha(onClassColorTheme.darkGrey, 0.3),
        },
      }}
      alt="profile-image"
      src={src}
      {...otherProps}
    />
  );
};

export default OCAvatar;

//         <OCAvatar src={item.profile_pic} />
