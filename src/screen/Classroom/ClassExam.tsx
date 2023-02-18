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

const ClassExam: FC = () => {
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
