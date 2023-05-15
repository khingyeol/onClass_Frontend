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

const ExamCreateQuestions: FC = () => {

    return (
        <Box>
            Exam Create Question
        </Box>
    )
}

export default ExamCreateQuestions;

const useStyles = makeStyles((theme: Theme) => ({
}));
