import { Box, Theme, Typography, useMediaQuery } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import OCButton from "../../common/OCButton";
import { onClassColorTheme } from "../../common/theme/onClassColorTheme";
import AsmCard from "../../components/Home/AsmCard";
import { getTodo } from "../../services/class/api_class";
import { getAllAssignmentsResponse } from "../../services/types/ClassModel";
import { getClassDetail } from "../../store/classsdetail/selector";
import { formatShortDate } from "../../utils/formatDate";
import { ReactComponent as AddButton2 } from "../../assets/svg/icon_plus.svg";
import { makeStyles } from "@mui/styles";

const ClassAssignments: FC = () => {
  const classes = useStyles();
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const [content, setContent] = useState<getAllAssignmentsResponse[]>([]);
  const { classid } = useParams();
  const navigate = useNavigate();
  const { role } = useSelector(getClassDetail);

  const isTeacher = () => {
    if (role === "teacher") {
      return true;
    }
    return false;
  };

  const fetchGetAllAsm = async () => {
    try {
      const res = await getTodo(classid!);
      console.log("[assignmentAllClass] ERROR", classid);
      setContent(res.data.data);
    } catch (err) {
      console.log("[assignmentAllClass] ERROR");
    }
  };

  const mappedTextColor = (status: string) => {
    if (isTeacher()) {
      const newDate = new Date(status);
      const today = new Date();
      if (today > newDate) {
        return onClassColorTheme.error
      }
      return onClassColorTheme.green;
    }
    switch (status) {
      case "ได้รับมอบหมาย":
        return onClassColorTheme.green;
      case "ส่งแล้ว":
        return onClassColorTheme.grey;
      case "เลยกำหนด":
      case "ส่งช้า":
        return onClassColorTheme.error;
    }
  };

  const onClickASM = (id: string) => {
    navigate(`/${classid}/assignment/${id}`);
  };

  useEffect(() => {
    fetchGetAllAsm();
  }, []);

  return (
    <>
      <Box width="100%" maxWidth="1060px">
        <Box className={classes.headBox}>
          <Typography variant="h2">งานมอบหมาย</Typography>
          {isTeacher() ? (
            <OCButton
              label={isDesktop ? "Create New Assignment" : ""}
              onClick={() => navigate(`/${classid}/assignment/create`)}
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
          {content.length < 1 && <Typography>ไม่พบงานมอบหมาย</Typography>}
          {content.map((item: getAllAssignmentsResponse) => (
            <AsmCard
              title={item.assignment_name}
              midText={formatShortDate(item.assignment_end_date)}
              trailText={item.status}
              trailTextColor={mappedTextColor(isTeacher() ? item.assignment_end_date : item.status)}
              onClick={() => onClickASM(item.id)}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default ClassAssignments;

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
