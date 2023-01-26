import { Box, Theme, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostBox from "../../components/Class/PostBox";
import FeedPost from "../../components/Class/FeedPost";
import { makeStyles } from "@mui/styles";
import { getClassId } from "../../store/classsdetail/selector";
import { useSelector } from "react-redux";
import { getfromClass } from "../../services/class/api_class";
import { GetClassResponseData } from "../../services/types/getClassResponse";
import NotFoundImg from "../../assets/image/not-found-page.png";

const useStyles = makeStyles((theme: Theme) => ({

}));

const NotFoundPage: FC = () => {

    return (
        <>
        {/* <Box justifyContent="center"> */}
        <img src={NotFoundImg} alt="not-found-img" style={{width: "70%", maxWidth: "1000px", alignSelf: "center"}} />
        {/* </Box> */}
        </>
    )
}
export default NotFoundPage;
