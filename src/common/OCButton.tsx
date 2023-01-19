import React, { FC } from "react";
import { Button, Typography, alpha, ButtonProps } from "@mui/material";
import { onClassColorTheme } from "./theme/onClassColorTheme";

interface OCButtonProps extends Omit<ButtonProps, "variant"> {
  label: string;
  variant?: "primary" | "outline" | "error" | "black";
  btnStyle?: "round" | "corner";
  cornerRadius?: string;
  height?: string;
  fontSize?: string;
  fontWeight?: string;
  disabled?: boolean;
  leadingIcon?: any;
}

const primary = {
  backgroundColor: onClassColorTheme.primary,
  color: onClassColorTheme.white,
  " .MuiTypography-root": {
    color: onClassColorTheme.white,
  },
  ":hover": {
    backgroundColor: alpha(onClassColorTheme.primary, 0.8),
  },
  "&:disabled": {
    backgroundColor: alpha(onClassColorTheme.primary, 0.5),
  },
};

const outline = {
  border: `solid ${onClassColorTheme.primary}`,
  backgroundColor: onClassColorTheme.white,
  color: onClassColorTheme.primary,
  " .MuiTypography-root": {
    color: onClassColorTheme.primary,
  },
  ":hover": {
    backgroundColor: alpha(onClassColorTheme.primary, 0.2),
  },
  "&:disabled": {
    border: `2px solid rgba(65, 176, 148, 0.5)`,
    " .MuiTypography-root": {
      color: alpha(onClassColorTheme.primary, 0.5),
    },  
  },
};

const error = {
  backgroundColor: onClassColorTheme.white,
  color: onClassColorTheme.error,
  ":hover": {
    backgroundColor: alpha(onClassColorTheme.error, 0.2),
  },
  " .MuiTypography-root": {
    color: onClassColorTheme.error,
  },
  "&:disabled": {
    " .MuiTypography-root": {
      color: alpha(onClassColorTheme.error, 0.5),
    },  
  },
};

const black = {
  border: `1.5px solid ${onClassColorTheme.black}`,
  backgroundColor: onClassColorTheme.white,
  color: onClassColorTheme.black,
  ":hover": {
    backgroundColor: alpha(onClassColorTheme.black, 0.2),
  },
  " .MuiTypography-root": {
      color: onClassColorTheme.black,
  },
  "&:disabled": {
    " .MuiTypography-root": {
      color: alpha(onClassColorTheme.black, 0.1),
    },  
  },
};

const OCButton: FC<OCButtonProps> = (props) => {
  const {
    label,
    variant = "primary",
    color,
    cornerRadius,
    height,
    leadingIcon,
    btnStyle = "round",
    fontSize = "18px",
    fontWeight = "bold",
    disabled = false,
    sx,
    ...otherProps
  } = props;

  return (
    <Button
      disabled={disabled}
      sx={{
        height: `${height ? height : "43px"}`,
        borderRadius: `${cornerRadius ? cornerRadius : "21.5px"}`,
        paddingX: "30px",
        ...sx,
        ...(variant === "primary" && primary),
        ...(variant === "outline" && outline),
        ...(variant === "error" && error),
        ...(variant === "black" && black),
        // ...(btnStyle === "corner" && {  }),
      }}
      {...otherProps}
    >
      <Typography
        sx={{
          fontSize: fontSize,
          fontWeight: fontWeight,
          textTransform: "none",
          paddingY: "14px",
          display: 'flex',
          alignContent: 'center',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        {leadingIcon}
        {label}
      </Typography>
    </Button>
  );
};

export default React.memo(OCButton);
