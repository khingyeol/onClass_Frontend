import React, { FC } from "react";
import { Button, Typography, alpha, ButtonProps } from "@mui/material";
import { onClassColorTheme } from "./theme/onClassColorTheme";

interface OCButtonProps extends Omit<ButtonProps, "variant"> {
  label: string;
  variant?: "primary" | "outline";
}

const primary = {
  backgroundColor: onClassColorTheme.primary,
  color: onClassColorTheme.white,
  ":hover": {
    backgroundColor: alpha(onClassColorTheme.primary, 0.8),
  },
  '&:disabled': {
    backgroundColor: alpha(onClassColorTheme.primary, 0.5),
  },
};

const outline = {
  backgroundColor: onClassColorTheme.white,
  color: onClassColorTheme.primary,
  ":hover": {
    backgroundColor: alpha(onClassColorTheme.primary, 0.2),
  },
  "& .MuiButtonBase-root": {
    "& fieldset": {
      borderWidth: "2px",
      borderColor: onClassColorTheme.primary,
    },
  },
};

const OCButton: FC<OCButtonProps> = (props) => {
  const { label, variant = "primary", sx, ...otherProps } = props;

  return (
    <Button
      onClick={props.onClick}
      sx={{
        height: "43px",
        borderRadius: "21.5px",
        fontWeight: "bold",
        paddingX: "30px",
        borderWidth: 1,
        borderColor: onClassColorTheme.darkGrey,
        ...sx,
        ...(variant === "primary" && primary),
        ...(variant === "outline" && outline),
      }}
      {...otherProps}
    >
      <Typography
        sx={{
          fontsize: "18px",
          fontWeight: "bold",
          textTransform: "none",
          paddingY: "14px",
          color:
            variant === "primary"
              ? onClassColorTheme.white
              : variant === "outline"
              ? onClassColorTheme.primary
              : onClassColorTheme.primary,
        }}
      >
        {label}
      </Typography>
    </Button>
  );
};

export default React.memo(OCButton);
