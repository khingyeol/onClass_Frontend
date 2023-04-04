import React, { FC, useState } from "react";
import {
  Button,
  Typography,
  alpha,
  ButtonProps,
  Chip,
  ChipProps,
  Theme,
} from "@mui/material";
import { onClassColorTheme } from "./theme/onClassColorTheme";
import { makeStyles } from '@mui/styles';

interface OCChipData {
  label: string;
  value?: string;
}

interface OCChipProps extends ChipProps {
  data: OCChipData[];
  selectedValue?: string;
  handleOnSelect?: (value: string) => void;
}

const OCChip: FC<OCChipProps> = (props) => {
  const { data, selectedValue, handleOnSelect, ...otherProps } = props;
  const [selected, setSelected] = useState(selectedValue);
const [isSelect, setIsSelect] = useState(false);

  const handleClick = (value: string) => {
    handleOnSelect && handleOnSelect(value);
    setSelected(value);
  };

  return (
    <div style={{display: "inline"}}>
      {data.map((item) => {
        return (
          <Chip
            label={item.label}
            onClick={() => handleClick(item.value ?? item.label)}
            style={{
               backgroundColor: (selected === item.value ?? item.label) ? `rgba(65,176,148,0.3)` : `rgba(139,139,139,0)`
            }}
            sx={{
                margin: "5px 5px",
                padding: {xs: "17px 12px", sm: "20px 15px"},
                borderRadius: "16px",
                fontSize: {xs: "14px", sm: "16px"},
                fontWeight: (selected === item.value ?? item.label) ? "bold" : "regular",
                fontFamily: 'FC-Subject',
                border: (selected === item.value ?? item.label) ? `1px solid rgba(65,176,148,1)` : `1px solid rgba(139,139,139,0.3)`,
                color: (selected === item.value ?? item.label) ? `rgba(65,176,148, 1)` : `rgba(139,139,139,1)`
            }}
          />
        );
      })}
    </div>
  );
};
export default OCChip;
