import { Box, Theme, Typography, useMediaQuery } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import OCButton from "../../common/OCButton";
import { onClassColorTheme } from "../../common/theme/onClassColorTheme";
import AsmCard from "../../components/Home/AsmCard";
import { getClassDetail } from "../../store/classsdetail/selector";
import { formatDateTime, formatShortDate } from "../../utils/formatDate";
import { ReactComponent as AddButton2 } from "../../assets/svg/icon_plus.svg";
import { makeStyles } from "@mui/styles";
import { getAllExam } from "../../services/class/api_exam";
import { GetAllExamResponseData } from "../../services/types/getAllExamResponse";

const ClassExam: FC = () => {
  const classes = useStyles();
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const [content, setContent] = useState<GetAllExamResponseData[]>([]);
  const { classid } = useParams();
  const navigate = useNavigate();
  const { role } = useSelector(getClassDetail);

  const isTeacher = () => {
    if (role === "teacher") {
      return true;
    }
    return false;
  };

  const fetchGetAllExam = async () => {
    try {
      const res = await getAllExam(classid!);
      setContent(res.data.data);
    } catch (err) {
      console.log("[ExamAllClass] ERROR", err);
    }
  };

  const mappedTextColor = (status: string) => {
    // if (isTeacher()) {
    //   const newDate = new Date(status);
    //   const today = new Date();
    //   if (today > newDate) {
    //     return onClassColorTheme.error
    //   }
    //   return onClassColorTheme.green;
    // }
    switch (status) {
      case "ยังไม่ถึงช่วงสอบ":
        return onClassColorTheme.grey;
      case "อยู่ในช่วงสอบ":
        return onClassColorTheme.green;
      case "ส่งช้า":
        return onClassColorTheme.error;
      default:
        return onClassColorTheme.black;
    }
  };

  const onClickExam = (id: string) => {
    navigate(`/${classid}/exam/${id}`);
  };

  useEffect(() => {
    fetchGetAllExam();
  }, []);

  return (
    <>
      <Box width="100%" maxWidth="1060px">
        <Box className={classes.headBox}>
          <Typography variant="h2">การสอบทั้งหมด</Typography>
          {isTeacher() ? (
            <OCButton
              label={isDesktop ? "Create New Exam" : ""}
              onClick={() => navigate(`/${classid}/exam/create`)}
              leadingIcon={<AddButton2 />}
              fontSize="20px"
              cornerRadius="15px"
              variant="black"
              fontWeight="regular"
              sx={{
                width: { xs: "40px", sm: "auto" },
                height: { xs: "40px", sm: "auto" },
                padding: { xs: "22px 0px 22px 0px", sm: "0px 18px" }, //Vertical, Horizontal
                gap: { xs: 0, sm: 1 },
                borderWidth: 1,
                borderColor: onClassColorTheme.darkGrey,
                "&& .MuiTouchRipple-child": {
                  backgroundColor: onClassColorTheme.darkGrey,
                },
              }}
            />
          ) : null}
        </Box>

        <Box className={classes.contentBox}>
          {content.length < 1 && <Typography>ไม่พบข้อสอบ</Typography>}
          {content.map((item: GetAllExamResponseData) => (
            <AsmCard
              title={item.exam_name}
              midText={`${formatDateTime(item.exam_start_date)} - ${formatDateTime(item.exam_end_date)}`}
              trailText={item.status}
              trailTextColor={mappedTextColor(item.status)}
              onClick={() => onClickExam(item.id)}
            />
          ))}
        </Box>

      </Box>
    </>
  );
};
export default ClassExam;

const useStyles = makeStyles((theme: Theme) => ({
  headBox: {
    padding: 3,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      padding: 2,
    },
  },
  contentBox: {
    display: "flex",
    flexDirection: "column",
    gap: "21px",
  },
}));
