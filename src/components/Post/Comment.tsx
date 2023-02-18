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
import { assignmentComment, postComment } from "../../services/class/api_class";
import { getSelectedId, getSelectedType } from "../../store/stage/selector";
import { formatDate, formatTime } from "../../utils/formatDate";
import { useParams } from "react-router-dom";
import { CommentModel } from "../../services/types/ClassModel";

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
      assignmentComment(classid!, id!, comment).then(() => {
      });
    } else if (type === "POST") {
      postComment(classid!, id!, comment).then(() => {
      });
    }
    setComment("");
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setComment(e.target.value);
  };
  console.log(comment_data);
  const commentMapped =
    comment_data &&
    comment_data.map((item) => (
      <Box className={classes.commentbox} key={item.create}>
        <Avatar
          sx={{
            width: isDesktop ? 60 : 45,
            height: isDesktop ? 60 : 45,
            boxSizing: "border-box",
            border: "1px solid #707070",
            //   alignSelf: "center",
          }}
          alt="profile-image"
          src={item.profile_pic}
        />

        <Box className={classes.contentBox}>
          <Box style={{ display: "flex", gap: "16px" }}>
            <Typography variant="title3" color={onClassColorTheme.black}>
              {`${item.comment_author.firstname} ${item.comment_author.lastname}`}
            </Typography>

            <Typography variant="description" color={onClassColorTheme.grey}>
              {`${formatDate(item.create ?? "")} ${formatTime(
                item.create ?? ""
              )}`}
            </Typography>
          </Box>

          {/* Content */}
          <Box className={classes.contents}>{item.content}</Box>
        </Box>
      </Box>
    ));

  return (
    <>
      <Box className={classes.container}>
        {commentMapped}

        <Box
          className={classes.comments}
          display="flex"
          sx={{
            borderTop: `${comment_data && comment_data.length !== 0
                ? "1px solid #BFBFBF"
                : "0px"
              }`,
            paddingTop: `${comment_data && comment_data.length !== 0 ? "10px" : "0px"
              }`,
          }}
        >
          <OCTextField
            value={comment}
            onChange={(e) => handleChange(e)}
            placeholder="Comments…"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onClickSend();
              }
            }}
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
    [theme.breakpoints.down("sm")]: {
      padding: "13px 18px",
      borderRadius: "28px",
      borderColor: alpha(onClassColorTheme.darkGrey, 0.2),
      gap: "8px",

    }
  },
  commentbox: {
    display: "flex",
  },
  contentBox: {
    padding: "5px",
  },
  contents: {
    padding: "0.5rem 0",
    wordBreak: "break-word",
    whiteSpace: "pre-line",
    fontweight: "regular",
    [theme.breakpoints.down("sm")]: {
      fontSize: "15px",
    }
  },
  comments: {
    marginTop: "10px",
    display: "flex",
    gap: "15px",
    bottom: "0",
  },
}));
