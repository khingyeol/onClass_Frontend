import { Theme, alpha, TextField, Box, Collapse } from "@mui/material";
import { onClassColorTheme } from "./theme/onClassColorTheme";
import OCIconButton from "./OCIconButton";
import OCButton from "./OCButton";
import React, {
  useState,
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
} from "react";
import { makeStyles } from "@mui/styles";
import PlusIcon from "../assets/svg/icon_plus.svg";
import CloseIcon from "../assets/svg/icon_close.svg";

export interface OCPollBuilderFunction {
  onClickShow: () => void;
}

interface OCPollBuilderProps {
  pollItems: string[];
  handleChange: (value: string, index: number) => void;
  handleUpdatePollItem: (type: string) => void;
  handleOnCancel?: () => void;
}

const OCPollBuilder: ForwardRefRenderFunction<
  OCPollBuilderFunction,
  OCPollBuilderProps
> = (props, ref) => {
  const classes = useStyles();
  const { pollItems, handleChange, handleUpdatePollItem, handleOnCancel } =
    props;

  const [isShow, setIsShow] = useState<boolean>(false);

  const onClickCancelButton = () => {
    if (handleOnCancel) {
      setIsShow(false);
      handleOnCancel();
    }
  };

  useImperativeHandle(ref, () => ({
    onClickShow() {
      setIsShow(!isShow);
    },
  }));

  const displayAddButton = (index: number) => {
    if (pollItems.length === index + 1 && pollItems.length < 4) {
      return true;
    }
    return false;
  };

  const displayRemoveButton = (index: number) => {
    if (pollItems.length === index + 1 && pollItems.length > 2) {
      return true;
    }
    return false;
  };

  return (
    <Collapse in={isShow}>
      <Box className={classes.pollBuilderBox}>
        {pollItems.map((value, index) => (
          <Box className={classes.pollItemBox} key={index}>
            <TextField
              name={`option${index}`}
              type="text"
              value={value}
              onChange={(e) => handleChange(e.target.value, index)}
              placeholder={`option ${index + 1}. (placeholder)`}
              sx={{
                width: "90%",
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: alpha(onClassColorTheme.darkGrey, 0.3),
                  },
                },
                "& .MuiInputBase-root": {
                  borderRadius: "16px",
                  backgroundColor: alpha(onClassColorTheme.darkGrey, 0.3),
                  "& input": {
                    height: "33px",
                    padding: "5px 25px",
                    borderRadius: "16px",
                    backgroundColor: onClassColorTheme.white,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: onClassColorTheme.primary,
                  },
                },
              }}
            />
            {displayRemoveButton(index) && (
              <OCIconButton
                icon={CloseIcon}
                color={onClassColorTheme.grey}
                size={"30px"}
                bgColor={'alpha(color, 0.1)'}
                onClick={() => handleUpdatePollItem("remove")}
              />
            )}
            {displayAddButton(index) && (
              <OCIconButton
                icon={PlusIcon}
                color={onClassColorTheme.grey}
                size={"30px"}
                bgColor={'alpha(color, 0.1)'}
                onClick={() => handleUpdatePollItem("add")}
              />
            )}
          </Box>
        ))}
        <Box sx={{ display: "flex", justifyContent: "flex-end", width: "90%" }}>
          <OCButton
            label="cancel"
            variant="error"
            fontWeight="regular"
            height="28px"
            cornerRadius="8px"
            onClick={onClickCancelButton}
          />
        </Box>
      </Box>
    </Collapse>
  );
};

export default forwardRef(OCPollBuilder);

const useStyles = makeStyles((theme: Theme) => ({
  pollBuilderBox: {
    gap: "10px",
    justifyContent: "space-between",
    alignContent: "center",
    backgroundColor: onClassColorTheme.white,
    borderRadius: "20px",
    border: "1px solid",
    borderColor: alpha(onClassColorTheme.darkGrey, 0.3),
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    transition: "all 0.4s ease",
    [theme.breakpoints.down("md")]: {
      padding: "20px 15px",
    },
    [theme.breakpoints.down("sm")]: {
      cursor: "pointer",
      minHeight: "69px",
      padding: "0px 35px",
      borderRadius: "35px",
      color: onClassColorTheme.grey,
    },
  },
  pollItemBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));
