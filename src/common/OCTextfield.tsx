import React, { FC, useEffect, useState } from "react";
import { Box, TextField, TextFieldProps, Typography } from "@mui/material";
import { onClassColorTheme } from "./theme/onClassColorTheme";

interface OCTextFieldProps extends Omit<TextFieldProps, "label"> {
  label?: string;
  placeholder?: string;
}

const OCTextField: FC<OCTextFieldProps> = (props) => {
  const { label, placeholder, ...otherProps } = props;
  return (
    <Box flex={"flex"} gap={3} width='100%'>
      <Typography fontSize='18px' fontFamily='FC-Subject' fontWeight='regular' color={onClassColorTheme.grey}>{label}</Typography>
      <TextField
      fullWidth
      // name={props.name}
      // onChange={props.onChange}
      // value={props.value}
      placeholder={placeholder}
        sx={{
          height: "43px",
          '& .MuiOutlinedInput-root': {
            color: onClassColorTheme.black,
            height: "43px",
            borderRadius: '23px',
            padding: '5px',
            backgroundColor: onClassColorTheme.lightgrey,  
            '& fieldset': {
                border: 0,
                borderWidth: 0,
                height: "43px",
                borderRadius: '23px',
            },
            '&.Mui-focused fieldset': {
                borderColor: onClassColorTheme.primary,
                height: "43px",
                borderRadius: '23px',
              },      
          }
        }}
        {...otherProps}
      >
      </TextField>
    </Box>
  );
};
export default OCTextField;
