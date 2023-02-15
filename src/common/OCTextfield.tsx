import React, { FC, useEffect, useState } from "react";
import { Box, TextField, TextFieldProps, Typography } from "@mui/material";
import { onClassColorTheme } from "./theme/onClassColorTheme";

interface OCTextFieldProps extends Omit<TextFieldProps, "variant"> {
  label?: string;
  variant?: 'fill' | 'outline';
  placeholder?: string;
  maxWidth?: string;
}

const OCTextField: FC<OCTextFieldProps> = (props) => {
  const { label, variant = 'fill', placeholder, maxWidth, ...otherProps } = props;
  return (
    <Box flex={"flex"} gap={3} width="100%" maxWidth={maxWidth}>
      <Typography
        fontSize="18px"
        fontFamily="FC-Subject"
        fontWeight="regular"
        color={onClassColorTheme.grey}
      >
        {label}
      </Typography>
      <TextField
        fullWidth
        // name={props.name}
        // onChange={props.onChange}
        // value={props.value}
        // inputProps={{ sx: {
        //   ''
        // }}}
        placeholder={placeholder}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: variant === 'outline' ? `1px solid rgba(139,139,139,0.3)` : 0,
              // borderWidth: 0,
            },
          },
          "& .MuiInputBase-root": {
            borderRadius: "23px",
            backgroundColor: variant === 'fill' ? onClassColorTheme.lightgrey : onClassColorTheme.white,
            // borderColor: onClassColorTheme.grey,
            "& input": {
              height: "33px",
              padding: "5px 20px",
              borderRadius: "23px",
              backgroundColor: variant === 'fill' ? onClassColorTheme.lightgrey : onClassColorTheme.white,
              // borderColor: onClassColorTheme.grey,
            },
            "&.Mui-focused fieldset": {
              borderColor: onClassColorTheme.primary,
            },
          },
          // "& .MuiOutlinedInput-root": {
          //   color: onClassColorTheme.black,
          //   // height: "43px",
          //   borderRadius: "23px",
          //   padding: "5px",
          //   backgroundColor: onClassColorTheme.lightgrey,
          //   "& fieldset": {
          //     border: 0,
          //     borderWidth: 0,
          //     // height: "43px",
          //     borderRadius: "23px",
          //   },
          //   "&.Mui-focused fieldset": {
          //     borderColor: onClassColorTheme.primary,
          //     // height: "43px",
          //     borderRadius: "23px",
          //   },
          // },
        }}
        {...otherProps}
      ></TextField>
    </Box>
  );
};
export default OCTextField;
