import {
  alpha,
  Avatar,
  Box,
  TextField,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ChangeEvent, FC, memo, useState } from "react";
import { onClassColorTheme } from "../../common/theme/onClassColorTheme";
import { makeStyles } from "@mui/styles";
import dummyTeacher from "../../assets/image/dummy-teacher.png";
import IconComment from "../../assets/svg/icon_comment.svg";
import IconSend from "../../assets/svg/icon_send.svg";
import OCIconButton from "../../common/OCIconButton";
import OCTextField from "../../common/OCTextfield";
import OCPollSection from "../../common/OCPollSection";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getClassId } from "../../store/classsdetail/selector";
import {
  AllStageType,
  updateCurrentStage,
  updateSelectedId,
  updateSelectedType,
} from "../../store/stage/action";
import { formatDate, formatTime } from "../../utils/formatDate";
import {
  assignmentComment,
  postComment,
  postPollVote,
} from "../../services/class/api_class";
import IconASM from "../../assets/svg/icon_asm.svg";
import { PollModel } from "../../services/types/ClassModel";
import OCAvatar from "../../common/OCAvatar";
import { getUserData } from "../../store/userdata/selector";
import { render } from "@testing-library/react";

interface TFGroupProps {
  selected: number[];
  onClick: (event: any) => void;
  onChange?: (event: any) => void;
  name?: string;
  value?: string;
  part?: number;
  ques: number;
  index: number;
}

const TFGroup: FC<TFGroupProps> = (props) => {
  const { selected, onClick, onChange, value, name, index, part, ques } = props;
  const classes = useStyles();
  return (
    <Box
      className={classes.container}
      bgcolor={
        index === selected[ques]
          ? `${alpha(onClassColorTheme.green, 0.5)}`
          : "white"
      }
      onClick={() => {
        onClick(selected.map((v, i) => (i === ques ? index : v)));
        console.log(ques, index, selected);
      }}
      //   flex={"flex"}
      //   width="100%"
    >
      <TextField
        onChange={onChange}
        name={name}
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: 0,
            },
          },
          "& .MuiInputBase-root": {
            borderRadius: "23px",
            "& input": {
              height: "15px",
              border: "0px",
              // padding: "5px 20px",
              borderRadius: "23px",
            },
          },
          "&.Mui-focused fieldset": {
            borderColor: onClassColorTheme.primary,
          },
        }}
      ></TextField>
    </Box>
  );
};
export default memo(TFGroup);

const useStyles = makeStyles((_theme: Theme) => ({
  container: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    padding: "10px",
    borderRadius: "35px",
    border: "1px solid",
    borderColor: alpha(onClassColorTheme.darkGrey, 0.3),
    transition: "all 0.4s ease",
  },
}));
