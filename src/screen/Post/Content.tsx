import { alpha, Box, Theme, Typography, useMediaQuery } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { onClassColorTheme } from "../../common/theme/onClassColorTheme";
import { makeStyles } from "@mui/styles";
import OCIconButton from "../../common/OCIconButton";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getClassId } from "../../store/classsdetail/selector";
import { assignmentGet } from "../../services/class/api_class";
import { getSelectedId, getSelectedType } from "../../store/stage/selector";
import { AssignmentModel } from "../../services/types/getAssignmentResponse";
import IconASM from "../../assets/svg/icon_asm.svg";
import { formatDate } from "../../utils/formatDate";
import CommentSection from "../../components/Post/Comment";

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
  boxhead: {
    display: "flex",
    justifyContent: "space-between",
  },
  headline: {
    justifyContent: "flex-start",
    alignContent: "center",
    display: "flex",
    gap: "20px",
    cursor: "pointer",
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
    borderTop: "1px solid rgba(191, 191,191, 0.2)",
    display: "flex",
    // whiteSpace: "nowrap",
    paddingTop: "10px",
    gap: "15px",
    // width: "90%",
    bottom: "0",
    // overflowX: "auto",
  },
}));

const Content: FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const classid = useSelector(getClassId);
  const type = useSelector(getSelectedType);
  // const postid = useSelector(getSelectedId);
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const [content, setContent] = useState<AssignmentModel>();
  const { classid, id } = useParams();

  const fetchGetPost = async () => {
    if (type === "ASSIGNMENT") {
      const response = await assignmentGet(classid!, id!);
      setContent(response.data.data);
      console.log(response.data.data);
    }
  };

  useEffect(() => {
    console.log("classid", classid);
    console.log("id", id);

    fetchGetPost();
  }, []);

  return (
    <>
      <Box className={classes.postbox}>
        {/* Headline */}
        <Box className={classes.boxhead}>
          <Box className={classes.headline}>
            <OCIconButton
              icon={IconASM}
              color={onClassColorTheme.green}
              size={isDesktop ? "60px" : "50px"}
            />
            {/* <Avatar
            sx={{
              width: isDesktop ? 60 : 50,
              height: isDesktop ? 60 : 50,
              boxSizing: "border-box",
              border: "1px solid #707070",
              alignSelf: "center",
            }}
            alt="profile-image"
            src={dummyTeacher}
          /> */}
            <Box style={{ alignSelf: "center" }}>
              <Typography
                variant="h3"
                fontSize="21px"
                color={onClassColorTheme.green}
              >
                {content?.assignment_name}
              </Typography>

              <Typography variant="body1" color={onClassColorTheme.grey}>
                {`${formatDate(content?.assignment_start_date ?? "")}`}
              </Typography>
            </Box>
          </Box>
          <Typography
            variant="h3"
            fontSize="21px"
            color={onClassColorTheme.black}
          >
            {`${content?.score} pts.`}
          </Typography>
        </Box>
        {/* Content */}
        <Box
          className={classes.contents}
          sx={{ borderTop: "1px solid rgba(139, 139,139, 0.2)" }}
        >
          {content?.assignment_description}
        </Box>
      </Box>
      <Box padding={1.5} />
      <CommentSection comment_data={content?.comment!} />
    </>
  );
};

export default Content;
