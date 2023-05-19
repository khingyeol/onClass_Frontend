import {
  alpha,
  Box,
  Button,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { FC, useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import { onClassColorTheme } from "../../common/theme/onClassColorTheme";
import { makeStyles } from "@mui/styles";
import OCButton from "../../common/OCButton";
import {
  assignmentGet,
  assignmentStdSubmit,
} from "../../services/class/api_class";
import { AssignmentModel } from "../../services/types/ClassModel";
import { async } from "q";
import { response } from "express";
import { uploadFile } from "../../services/class/api_file";
import OCTextField from "../../common/OCTextfield";
import { AssignmentStdSubmit } from "../../services/types/patchAssignmentStdSubmit";
import { formatDate, formatShortDate } from "../../utils/formatDate";
import { getClassDetail } from "../../store/classsdetail/selector";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { displayDialog, hideDialog } from "../../store/dialog/action";

const AsmTeacherBox: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { classid, id } = useParams();
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const classDetail = useSelector(getClassDetail);
  const [asmContent, setAsmContent] = useState<AssignmentModel>();
  const currentPath = window.location.pathname;

  const fetchGetPost = async () => {
    await assignmentGet(classid!, id!)
      .then((response) => {
        if (response.data.result === "OK") setAsmContent(response.data.data);
      })
      .catch((error) => {
        // setError(true);
      });
  };

  const mappedStatusCount = (result: any[]) => {
    var count = 0;
    result.forEach((item) => (item.status === "ส่งแล้ว" && count++))
    return count;
  }

  const mappedScoreSubmit = (result: any[]) => {
    var count = 0;
    result.forEach((item) => (item.score !== null && count++))
    return count;
  }

  const showDialogDue = () => {
    dispatch(
      displayDialog({
        id: "onTappedEditASM",
        isShow: true,
        title: "ปิดรับงาน",
        message: "ต้องการปิดรับงานทันทีหรือไม่?",
        primaryLabel: "ตกลง",
        onPrimaryAction: () => {
          // dispatch(hideDialog());
        },
        secondaryLabel: "ยกเลิก",
        onSecondaryAction: () => {
          dispatch(hideDialog());
        }
      })
    );
  }

  useEffect(() => {
    fetchGetPost();
  }, []);

  return (
    <Box className={classes.box}>
      <Box className={classes.content}>
        <Box className={classes.title}>
          <Typography variant="h4">ส่งแล้ว:</Typography>
          <Typography variant="h4">
            {mappedStatusCount(asmContent?.assignment_student_result ?? [])}
          </Typography>
        </Box>
        <Box className={classes.title}>
          <Typography variant="h4">มอบหมาย:</Typography>
          <Typography variant="h4">{classDetail.student.length}</Typography>
        </Box>
        <Box className={classes.title}>
          <Typography variant="h4">ตรวจแล้ว:</Typography>
          <Typography variant="h4">
            {mappedScoreSubmit(asmContent?.assignment_student_score ?? [])}
          </Typography>
        </Box>
        <Box className={classes.title}>
          <Typography variant="h4">กำหนดส่ง:</Typography>
          <Typography variant="h4">
            {formatDate(asmContent?.assignment_end_date ?? "")}
          </Typography>
        </Box>
      </Box>

      <OCButton
        label={"แก้ไขชิ้นงาน"}
        variant={"grey"}
        // onClick={() => navigate(`${currentPath}/edit`)}
        height="36px"
        cornerRadius="10px"
        //   disabled={answerResult === ""}
        disabled
      />
      <OCButton
        label={"ปิดรับงาน"}
        variant={"error"}
        onClick={showDialogDue}
        height="36px"
        cornerRadius="10px"
        //   disabled={answerResult === ""}
        disabled
      />
      <OCButton  
        label={"ตรวจงาน"}
        onClick={() => navigate(`${currentPath}/score`)}
        height="36px"
        cornerRadius="10px"
        //   disabled={answerResult === ""}
      />
    </Box>
  );
};
export default AsmTeacherBox;

const useStyles = makeStyles((theme: Theme) => ({
  box: {
    width: "340px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    margin: "0px 50px 0px 10px",
    transition: "all 0.4s ease",
    [theme.breakpoints.down("lg")]: {
      width: "306px",
      margin: "0px 15px 0px 10px",
    },
  },
  content: {
    padding: "25px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    borderRadius: "35px",
    border: "1px solid ",
    borderColor: alpha(onClassColorTheme.darkGrey, 0.3),
    [theme.breakpoints.down("lg")]: {
      fontSize: "16px",
      padding: "20px",
      borderRadius: "25px",
    },
    // objectFit: "none",
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
  },
  dropZone: {
    backgroundColor: "#F6F8FA",
  },
  filename: {
    backgroundColor: "#F6F8FA",
    borderRadius: "10px",
    padding: "8px 12px",
  },
}));
