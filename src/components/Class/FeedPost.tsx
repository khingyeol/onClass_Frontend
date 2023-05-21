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
import dummyTeacher from "../../assets/image/dummy-teacher.png";
import IconComment from "../../assets/svg/icon_comment.svg";
import IconSend from "../../assets/svg/icon_send.svg";
import OCIconButton from "../../common/OCIconButton";
import OCTextField from "../../common/OCTextfield";
import OCPollSection from "../../common/OCPollSection";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getClassId } from "../../store/classsdetail/selector";
import {
  AllStageType,
  updateCurrentStage,
  updateSelectedId,
  updateSelectedType,
} from "../../store/stage/action";
import { formatDate, formatTime } from "../../utils/formatDate";
import {
  assignmentComment,
  postComment,
  postPollVote,
} from "../../services/class/api_class";
import IconASM from "../../assets/svg/icon_asm.svg";
import { PollModel } from "../../services/types/ClassModel";
import OCAvatar from "../../common/OCAvatar";
import { getUserData } from "../../store/userdata/selector";

interface FeedPostProps {
  type: string;
  data: any;
}

const FeedPost: FC<FeedPostProps> = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const classid = useSelector(getClassId);
  const { classid } = useParams();
  const [comment, setComment] = useState("");
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const { type, data } = props;

  const onClickSend = () => {
    if (type === "assignment") {
      assignmentComment(classid!, data.id, comment);
    } else if (type === "poll" || type === "post") {
      postComment(classid!, data.id, comment);
    }
    console.log(comment);
    setComment("");
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setComment(e.target.value);
  };

  const handleOnClickVote = async (votedPoll: PollModel) => {
    const reqBody = {
      class_code: classid!,
      post_id: data.id,
      choice_name: votedPoll.choice_name,
    };
    const response = await postPollVote(
      reqBody.class_code,
      reqBody.post_id,
      reqBody.choice_name
    );
  };

function linkify(text: string) {
  var urlRegex = /((http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-]))/g;
  //var urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, function(url,b,c) {
      var url2 = (c == 'www.') ?  'http://' +url : url;
      return '<a href="' +url2+ '" target="_blank">' + url + '</a>';
  }) 
}

  const renderTitle = () => {
    switch (type) {
      case "post": {
        return (
          <Typography variant="title3" color={onClassColorTheme.green}>
            {`${data.post_author.firstname} ${data.post_author.lastname} ${data.post_author.optional_name && `(${data.post_author.optional_name})`}`}
          </Typography>
        );
      }
      case "poll": {
        return (
          <Typography variant="title3" color={onClassColorTheme.green}>
            {`${data.post_author.firstname} ${data.post_author.lastname} ${
              `(${data.post_author.optional_name ?? ""})` ?? ""
            }`}
          </Typography>
        );
      }

      case "assignment": {
        return (
          <Typography variant="title3" color={onClassColorTheme.green}>
            {data.assignment_name}
          </Typography>
        );
      }
    }
  };

  return (
    <>
      <Box className={classes.postbox}>
        {/* Headline */}
        <Box
          className={classes.headline}
          onClick={() => {
            navigate(
              `/${classid}/${type === "assignment" ? "assignment" : "post"}/${
                data.id
              }`
            ); // <<< Navigate to each POST
            dispatch(updateCurrentStage(AllStageType.POST));
            dispatch(updateSelectedType(type.toUpperCase()));
            dispatch(updateSelectedId(data.id));
          }}
        >
          {type === "assignment" ? (
            // Assignment Pic
            <OCIconButton
              icon={IconASM}
              color={onClassColorTheme.green}
              size={isDesktop ? "60px" : "45px"}
            />
          ) : (
            // Profile Pic
            <OCAvatar src={data.profile_pic} sx={{ alignSelf: "center" }} />
          )}

          <Box style={{ alignSelf: "center" }}>
            {renderTitle()}
            <Typography variant="body1" color={onClassColorTheme.grey}>
              {`${formatDate(data.moment_sort)} | ${formatTime(
                data.moment_sort
              )}`}
            </Typography>
          </Box>
        </Box>

        {/* Content */}
        {type === "post" && (
          <Box
            className={classes.contents}
            sx={{ borderTop: "1px solid rgba(191, 191,191, 0.3)" }}
          >
            <p dangerouslySetInnerHTML={{ __html: linkify(data.post_content) }} />
          </Box>
        )}
        {type === "poll" && (
          <Box>
            <Box
              className={classes.contents}
              sx={{ borderTop: "1px solid rgba(191, 191,191, 0.3)" }}
            >
              {data.post_content}
            </Box>
            <OCPollSection
              pollItems={data.poll}
              voteAuthor={data.vote_author}
              postAuthor={data.post_author.user_id.toString()}
              handleOnClickVote={handleOnClickVote}
            />
          </Box>
        )}

        {/* Comment */}
        <Box className={classes.comments} display={{ xs: "none", sm: "flex" }}>
          <Box>
            {" "}
            {data.comment === 0 ? (
              <OCIconButton
                icon={IconComment}
                color={onClassColorTheme.grey}
                size={"50px"}
              />
            ) : (
              <Box
                width={"50px"}
                height={"50px"}
                borderRadius={"50%"}
                bgcolor={alpha(onClassColorTheme.grey, 0.1)}
                position="relative"
              >
                <Typography
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginLeft: "-25%",
                    marginTop: "-25%",
                    verticalAlign: "middle",
                    textAlign: "center",
                    fontWeight: "bold",
                    color: onClassColorTheme.grey,
                  }}
                >
                  {data.comment}
                </Typography>
              </Box>
            )}
          </Box>
          <OCTextField
            value={comment}
            onChange={(e) => handleChange(e)}
            placeholder="Comments…"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
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

export default FeedPost;

const useStyles = makeStyles((theme: Theme) => ({
  postbox: {
    gap: "10px",
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
    },
  },
  headline: {
    justifyContent: "flex-start",
    alignContent: "center",
    display: "flex",
    gap: "20px",
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      gap: "10px",
    },
  },
  contents: {
    fontSize: "16px",
    wordBreak: "break-word",
    whiteSpace: "pre-line",
    padding: "0.75rem 0",
    margin: "0.75rem 0 0 0",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
    },
  },
  comments: {
    marginTop: "10px",
    paddingTop: "10px",
    borderTop: "1px solid rgba(191, 191,191, 0.3)",
    display: "flex",
    gap: "15px",
    bottom: "0",
  },
}));
