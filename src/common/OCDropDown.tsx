// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { InputLabel, Theme, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent, SelectProps } from "@mui/material/Select";
import { makeStyles } from "@mui/styles";
import React, { FC } from "react";
import { onClassColorTheme } from "./theme/onClassColorTheme";

export interface OCDropdownItem {
  label: string;
  value: string | number;
}

interface OCDropdownProps<T> extends SelectProps {
  label?: string;
  items: T[];
  placeholder?: string;
  disabled?: boolean;
  value?: T;
  labelRow?: boolean;
  handleChange: (event: SelectChangeEvent<unknown | string>) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: onClassColorTheme.primary,
      },
      "&.Mui-error fieldset": {
        borderColor: onClassColorTheme.error,
      },
    },
  },
  menuRoot: {
    wordBreak: "break-all",
    whiteSpace: "break-spaces",
  },
}));

const OCDropdown: FC<OCDropdownProps<OCDropdownItem | string>> = (props) => {
  const {
    label,
    items,
    handleChange,
    placeholder,
    disabled,
    labelRow = false,
    value = "",
    ...otherProps
  } = props;
  const classes = useStyles();

  const renderItems = () => {
    return items.map((item) => {
      if (typeof item === "string") {
        return (
          <MenuItem key={item} value={item} sx={{ px: "24px", py: "16px" }}>
            <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
              {item}
            </Typography>
          </MenuItem>
        );
      }
      const { value: itemValue, label: itemLabel } = item;
      return (
        <MenuItem
          key={itemValue}
          value={itemValue}
          sx={{ px: "24px", py: "16px" }}
        >
          <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
            {itemLabel}
          </Typography>
        </MenuItem>
      );
    });
  };

  return (
    <div
      className={classes.root}
      style={
        labelRow
          ? {
              display: "flex",
              flexDirection: "row",
            }
          : {}
      }
    >
      {label && (
        <Typography
          variant="title3"
          sx={{
            marginBottom: (theme) => theme.spacing(1),
            display: "flex",
            whiteSpace: labelRow ? "nowrap" : null,
            alignItems: labelRow ? "center" : null,
            fontWeight: labelRow ? "700" : "500",
          }}
        >
          {label}
        </Typography>
      )}
      <FormControl
        disabled={disabled}
        sx={{
          width: (theme) => "100%",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor:
                value !== ""
                  ? onClassColorTheme.primary
                  : onClassColorTheme.darkGrey,
            },
          },
          '& .MuiTypography-root': {
            color: onClassColorTheme.primary
          },
        }}
      >
        {!value && (
          <InputLabel
            shrink={false}
            sx={{
              color: onClassColorTheme.grey,
              "&.Mui-focused": {
                color: onClassColorTheme.green
              },
              marginLeft: (theme) => theme.spacing(1),
            }}
          >
            {placeholder}
          </InputLabel>
        )}
        <Select
          labelId="dropdown-label"
          id="dropdown-id"
          value={value}
          onChange={handleChange}
          //   IconComponent={ExpandMoreIcon}
          sx={{ borderRadius: (theme) => theme.spacing(1) }}
          MenuProps={{
            sx: {
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "pre",
              "&& .Mui-selected": {
                backgroundColor: onClassColorTheme.primary,
              },
              "&& .Mui-selected:hover": {
                backgroundColor: onClassColorTheme.primary,
              },
            },
          }}
          {...otherProps}
        >
          {renderItems()}
        </Select>
      </FormControl>
    </div>
  );
};

export default React.memo(OCDropdown);
