import {
  alpha,
  Avatar,
  Box,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { onClassColorTheme } from "../../common/theme/onClassColorTheme";
import { makeStyles } from "@mui/styles";
import OCIconButton from "../../common/OCIconButton";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getClassId } from "../../store/classsdetail/selector";
import { assignmentGet, postGet } from "../../services/class/api_class";
import { getSelectedId, getSelectedType } from "../../store/stage/selector";
import IconASM from "../../assets/svg/icon_asm.svg";
import { formatDate } from "../../utils/formatDate";
import CommentSection from "../../components/Post/Comment";
import NotFoundPage from "../common/NotFoundPage";
import { AssignmentModel, PostModel } from "../../services/types/ClassModel";

const Content: FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const classid = useSelector(getClassId);
  const type = useSelector(getSelectedType);
  // const postid = useSelector(getSelectedId);
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const [asmContent, setAsmContent] = useState<AssignmentModel>();
  const [postContent, setPostContent] = useState<PostModel>();
  const { classid, id } = useParams();
  const [error, setError] = useState<boolean | null>();

  const fetchGetPost = async () => {
    if (type === "ASSIGNMENT") {
      assignmentGet(classid!, id!)
        .then((response) => {
          setAsmContent(response.data.data);
        })
        .catch((error) => {
          setError(true);
        });
    } else if (type === "POST") {
      postGet(classid!, id!)
        .then((response) => {
          setPostContent(response.data.data[0]);
          console.log(response.data.data[0]);
        })
        .catch((error) => {
          setError(true);
        });
    }
  };

  useEffect(() => {
    fetchGetPost();
  }, []);

  return (
    <>
      {error === true ? (
        <NotFoundPage />
      ) : (
        <>
          <Box className={classes.postbox}>
            {/* Headline */}
            <Box className={classes.boxhead}>
              <Box className={classes.headline}>
                {type === "POST" ? (
                  <Avatar
                    sx={{
                      width: isDesktop ? 60 : 50,
                      height: isDesktop ? 60 : 50,
                      boxSizing: "border-box",
                      border: "1px solid #707070",
                      alignSelf: "center",
                    }}
                    alt="profile-image"
                    src={postContent?.profile_pic ?? ""}
                  />
                ) : (
                  <OCIconButton
                    icon={IconASM}
                    color={onClassColorTheme.green}
                    size={isDesktop ? "60px" : "50px"}
                  />
                )}
                {/*  */}
                <Box style={{ alignSelf: "center" }}>
                  <Typography
                    variant="h3"
                    fontSize="21px"
                    color={
                      type === "POST"
                        ? onClassColorTheme.black
                        : onClassColorTheme.green
                    }
                  >
                    {asmContent?.assignment_name ??
                      `${postContent?.post_author.firstname} ${
                        postContent?.post_author.lastname
                      } ${
                        `(${postContent?.post_author.optional_name ?? ""})` ??
                        ""
                      }`}
                  </Typography>

                  <Typography variant="body1" color={onClassColorTheme.grey}>
                    {`${formatDate(
                      asmContent?.assignment_start_date ??
                        postContent?.created ??
                        ""
                    )}`}
                  </Typography>
                </Box>
              </Box>
              <Typography
                variant="h3"
                fontSize="21px"
                color={onClassColorTheme.black}
              >
                {type === "POST" ? null : `${asmContent?.score} pts.`}
              </Typography>
            </Box>
            {/* Content */}
            <Box
              className={classes.contents}
              sx={{ borderTop: "1px solid rgba(139, 139,139, 0.2)" }}
            >
              {asmContent?.assignment_description ?? postContent?.post_content}
            </Box>
          </Box>
          <Box padding={1.5} />
          <CommentSection
            comment_data={asmContent?.comment ?? postContent?.comment!}
          />
        </>
      )}
    </>
  );
};

export default Content;

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
