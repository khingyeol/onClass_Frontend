import {
  alpha,
  Avatar,
  Box,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ChangeEvent, FC, useState } from "react";
import { onClassColorTheme } from "../../common/theme/onClassColorTheme";
import { makeStyles } from "@mui/styles";
import IconComment from "../../assets/svg/icon_comment.svg";
import IconSend from "../../assets/svg/icon_send.svg";
import OCIconButton from "../../common/OCIconButton";
import OCTextField from "../../common/OCTextfield";
import { useDispatch, useSelector } from "react-redux";
import { getClassId } from "../../store/classsdetail/selector";
import { assignmentComment } from "../../services/class/api_class";
import { getSelectedId, getSelectedType } from "../../store/stage/selector";
import { CommentModel } from "../../services/types/getAssignmentResponse";
import { formatDate, formatTime } from "../../utils/formatDate";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    backgroundColor: onClassColorTheme.white,
    borderRadius: "35px",
    border: "1px solid ",
    borderColor: alpha(onClassColorTheme.darkGrey, 0.3),
    padding: "20px 30px",
    position: "relative",
  },
  commentbox: {
    display: "flex",
  },
  contentBox: {
    padding: "5px",
  },
  contents: {
    wordBreak: "break-word",
    whiteSpace: "pre-line",
  },
  comments: {
    // position: "sticky",
    // height: "50px",
    marginTop: "10px",
    paddingTop: "10px",
    borderTop: "1px solid #BFBFBF",
    display: "flex",
    // whiteSpace: "nowrap",
    gap: "15px",
    // width: "90%",
    bottom: "0",
    // overflowX: "auto",
  },
}));

interface CommentProps {
  comment_data: CommentModel[];
}

const CommentSection: FC<CommentProps> = (props) => {
  const { comment_data } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
//   const classid = useSelector(getClassId);
const { classid, id } = useParams();
  const type = useSelector(getSelectedType);
//   const postid = useSelector(getSelectedId);
  const [comment, setComment] = useState("");
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));

  const onClickSend = () => {
    if (type === "ASSIGNMENT") {
      assignmentComment(classid!, id!, comment);
    }
    console.log(comment);
    setComment("");
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setComment(e.target.value);
  };

  const commentMapped =
    comment_data &&
    comment_data.map((item) => (
      <>
        <Box className={classes.commentbox}>
          <Avatar
            sx={{
              width: isDesktop ? 60 : 50,
              height: isDesktop ? 60 : 50,
              boxSizing: "border-box",
              border: "1px solid #707070",
              //   alignSelf: "center",
            }}
            alt="profile-image"
            src={item.profile_pic}
          />

          <Box className={classes.contentBox}>
            <Box style={{ display: "flex", gap: "16px" }}>
              <Typography variant="body2" color={onClassColorTheme.black}>
                {`${item.comment_author.firstname} ${item.comment_author.lastname}`}
              </Typography>

              <Typography variant="body1" color={onClassColorTheme.grey}>
                {`${formatDate(item.create ?? "")} ${formatTime(
                  item.create ?? ""
                )}`}
              </Typography>
            </Box>

            {/* Content */}
            <Box className={classes.contents}>{item.content}</Box>
          </Box>
        </Box>
      </>
    ));

  return (
    <>
      <Box className={classes.container}>
        {commentMapped}

        <Box className={classes.comments} display="flex">
          <OCTextField
            value={comment}
            onChange={(e) => handleChange(e)}
            placeholder="Comments…"
          />
          <Box>
            <OCIconButton
              icon={IconSend}
              color={onClassColorTheme.grey}
              size={"50px"}
              onClick={onClickSend}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CommentSection;
