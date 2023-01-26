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
import { assignmentComment } from "../../services/class/api_class";
import IconASM from "../../assets/svg/icon_asm.svg";

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
    marginTop: "10px",
    paddingTop: "10px",
    borderTop: "1px solid rgba(191, 191,191, 0.3)",
    display: "flex",
    // whiteSpace: "nowrap",
    gap: "15px",
    // width: "90%",
    bottom: "0",
    // overflowX: "auto",
  },
}));

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
    }
    console.log(comment);
    setComment("");
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setComment(e.target.value);
  };

  const renderTitle = () => {
    switch (type) {
      case "post": {
        return (
          <Typography
            variant="h3"
            fontSize="21px"
            color={onClassColorTheme.green}
          >
            {`${data.post_author.firstname} ${data.post_author.lastname} ${
              `(${data.post_author.optional_name ?? ""})` ?? ""
            }`}
          </Typography>
        );
      }

      case "assignment": {
        return (
          <Typography
            variant="h3"
            fontSize="21px"
            color={onClassColorTheme.green}
          >
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
            navigate(`/${classid}/post/${data.id}`);
            dispatch(updateCurrentStage(AllStageType.POST));
            dispatch(updateSelectedType(type.toUpperCase()));
            dispatch(updateSelectedId(data.id));
          }}
        >
          {data.profile_pic ? (
            <Avatar
              sx={{
                width: isDesktop ? 60 : 50,
                height: isDesktop ? 60 : 50,
                boxSizing: "border-box",
                border: "1px solid #707070",
                alignSelf: "center",
              }}
              alt="profile-image"
              src={data.profile_pic}
            />
          ) : (
            <OCIconButton
              icon={IconASM}
              color={onClassColorTheme.green}
              size={isDesktop ? "60px" : "50px"}
            />
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
            {data.post_content}
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
