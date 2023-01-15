import {
  alpha,
  Avatar,
  Box,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { onClassColorTheme } from "../../common/theme/onClassColorTheme";
import ClassCard from "../../components/Home/ClassCard";
import NavAddBtn from "../Main/Navigation/NavAddBtn";
import { mockedData } from "../../mocked/mockedData";
import { makeStyles } from "@mui/styles";
import dummyTeacher from "../../assets/image/dummy-teacher.png";
import IconComment from "../../assets/svg/icon_comment.svg";
import IconSend from "../../assets/svg/icon_send.svg";
import OCIconButton from "../../common/OCIconButton";
import OCTextField from "../../common/OCTextfield";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getClassId } from "../../store/classsdetail/selector";

interface getAllClassResponse {
  class_code: string;
  class_name: string;
  class_section: string;
  teacher: {
    profile_pic: string;
    name: {
      firstname: string;
      lastname: string;
    };
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  postbox: {
    gap: "10px",
    backgroundColor: onClassColorTheme.white,
    borderRadius: "35px",
    border: "1px solid ",
    borderColor: alpha(onClassColorTheme.darkGrey, 0.3),
    padding: "20px 30px",
    position: "relative",
  },
  headline: {
    justifyContent: "flex-start",
    alignContent: "center",
    display: "flex",
    gap: "20px",
    cursor: 'pointer',
  },
  contents: {
    wordBreak: "break-word",
    whiteSpace: "pre-line",
    padding: "0.75rem 0",
    margin: "0.75rem 0",
    // borderTop: 1,
  },
  comments: {
    // position: "sticky",
    // height: "50px",
    borderTop: "1px solid #BFBFBF",
    display: "flex",
    // whiteSpace: "nowrap",
    paddingTop: "10px",
    gap: "15px",
    // width: "90%",
    bottom: "0",
    // overflowX: "auto",
  },
}));

const FeedPost: FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const classid = useSelector(getClassId);
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));

  return (
    <>
      <Box className={classes.postbox}>
        {/* Headline */}
        <Box className={classes.headline} onClick={() => navigate(`/${classid}/post/1234`)}>
          <Avatar
            sx={{
              width: isDesktop ? 60 : 50,
              height: isDesktop ? 60 : 50,
              boxSizing: "border-box",
              border: "1px solid #707070",
              alignSelf: "center",
            }}
            alt="profile-image"
            src={dummyTeacher}
          />
          <Box style={{ alignSelf: "center" }}>
            <Typography
              variant="h3"
              fontSize="21px"
              color={onClassColorTheme.green}
            >
              Teacher's Name
            </Typography>
            <Typography variant="body1" color={onClassColorTheme.grey}>
              21 Jun. 2020
            </Typography>
          </Box>
        </Box>

        {/* Content */}
        <Box
          className={classes.contents}
          sx={{ borderTop: "1px solid #BFBFBF" }}
        >
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for 'lorem ipsum' will uncover many web sites still in their
          infancy. Various versions have evolved over the years, sometimes by
          accident, sometimes on purpose (injected humour and the like).
        </Box>

        {/* Comment */}
        <Box className={classes.comments} display={{ xs: "none", sm: "flex" }}>
          <OCIconButton
            icon={IconComment}
            color={onClassColorTheme.grey}
            size={"50px"}
          />
          <OCTextField placeholder="Comments…" />
          {/* <img
              width="35px"
              height="35px"
              src={IconSend}
              alt="chevron-right"
            /> */}

          <OCIconButton
            icon={IconSend}
            color={onClassColorTheme.grey}
            size={"50px"}
          />
        </Box>
      </Box>
    </>
  );
};

export default FeedPost;
