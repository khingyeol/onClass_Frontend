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
import { makeStyles } from "@mui/styles";
import OCIconButton from "../../common/OCIconButton";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getClassId } from "../../store/classsdetail/selector";
import {
  assignmentGet,
  postGet,
  postPollVote,
} from "../../services/class/api_class";
import { getSelectedId, getSelectedType } from "../../store/stage/selector";
import IconASM from "../../assets/svg/icon_asm.svg";
import { formatDate, formatDateTime } from "../../utils/formatDate";
import CommentSection from "../../components/Post/Comment";
import NotFoundPage from "../common/NotFoundPage";
import {
  AssignmentModel,
  PollModel,
  PostModel,
} from "../../services/types/ClassModel";
import { gql, useSubscription } from "@apollo/client";
import OCAvatar from "../../common/OCAvatar";
import OCPollSection from "../../common/OCPollSection";

const ONASSIGNMENTUPDATED_SUBSCRIPTION = gql`
  subscription OnAssignmentUpdate($classCode: String!, $assignmentId: String!) {
    onAssignmentUpdate(class_code: $classCode, assignment_id: $assignmentId) {
      singleAssignment {
        comment {
          comment_author {
            lastname
            optional_name
            user_id
            firstname
          }
          content
          create
          profile_pic
        }
        id
      }
    }
  }
`;

const ONPOSTUPDATED_SUBSCRIPTION = gql`
  subscription OnPostUpdate($classCode: String!, $postId: String!) {
    onPostUpdate(class_code: $classCode, post_id: $postId) {
      singlePost {
        id
        post_content
        type
        post_author {
          user_id
          optional_name
          lastname
          firstname
        }

        poll {
          choice_name
          vote
        }
        created
        profile_pic
        vote_author {
          username
          vote
        }
        post_optional_file {
          file_extension
          file_name
          file_path
        }
        comment {
          comment_author {
            firstname
            lastname
            optional_name
            user_id
          }
          content
          profile_pic
          create
        }
        class_code
      }
    }
  }
`;

const Content: FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const classid = useSelector(getClassId);
  // const type = useSelector(getSelectedType);
  const pathname = window.location.pathname;
  const type = window.location.pathname.split("/")[2].toUpperCase();
  // const postid = useSelector(getSelectedId);
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const [asmContent, setAsmContent] = useState<AssignmentModel>();
  const [postContent, setPostContent] = useState<PostModel>();
  const { classid, id } = useParams();
  const [error, setError] = useState<boolean | null>();

  if (type === "ASSIGNMENT") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const subscriptionSingleAssignment = useSubscription(
      ONASSIGNMENTUPDATED_SUBSCRIPTION,
      {
        variables: { classCode: classid, assignmentId: id! },
        onData: ({ data }) => {
          if (!data.loading) {
            console.log("MYLOG: ", data.data.onAssignmentUpdate);
            const asmContentTemp = asmContent;
            asmContentTemp!.comment =
              data.data.onAssignmentUpdate.singleAssignment.comment;
            setAsmContent(asmContentTemp);
          }
        },
      }
    );
  } else if (type === "POST") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const subscriptionSinglePost = useSubscription(ONPOSTUPDATED_SUBSCRIPTION, {
      variables: { classCode: classid, postId: id! },
      onData: ({ data }) => {
        if (!data.loading) {
          console.log("MYLOG: ", data.data.onPostUpdate);
          setPostContent(data.data.onPostUpdate.singlePost);
        }
      },
    });
  }

  const handleOnClickVote = async (votedPoll: PollModel) => {
    const reqBody = {
      class_code: classid!,
      post_id: id!,
      choice_name: votedPoll.choice_name,
    };
    const response = await postPollVote(
      reqBody.class_code,
      reqBody.post_id,
      reqBody.choice_name
    );
  };

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
          setPostContent(response.data.data);
          console.log(response.data.data);
        })
        .catch((error) => {
          setError(true);
        });
    }
  };

  useEffect(() => {
    console.log("");
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
                  <OCAvatar
                    sx={{ alignSelf: "center" }}
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
                    variant="title3"
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
                    {`${formatDateTime(
                      asmContent?.assignment_start_date ??
                        postContent?.created ??
                        ""
                    )}`}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="title3" color={onClassColorTheme.black}>
                {type === "POST" ? null : `${asmContent?.score} pts.`}
              </Typography>
            </Box>
            {/* Content */}
            <Box
              className={classes.contents}
              // sx={{ borderTop: "1px solid rgba(139, 139,139, 0.2)" }}
            >
              {asmContent?.assignment_description ?? postContent?.post_content}
            </Box>
            {postContent?.type === "poll" && (
              <OCPollSection
                pollItems={postContent?.poll}
                voteAuthor={postContent?.vote_author!}
                handleOnClickVote={handleOnClickVote}
              />
            )}
          </Box>
          <Box padding={{ xs: 1, sm: 1.5 }} />
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
    [theme.breakpoints.down("sm")]: {
      padding: "13px 18px",
      borderRadius: "28px",
      borderColor: alpha(onClassColorTheme.darkGrey, 0.2),
    },
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
    [theme.breakpoints.down("sm")]: {
      gap: "10px",
    },
  },
  contents: {
    wordBreak: "break-word",
    whiteSpace: "pre-line",
    padding: "0.75rem 0",
    margin: "0.75rem 0 0 0",
    borderTop: "1px solid ",
    borderColor: alpha(onClassColorTheme.darkGrey, 0.3),
    [theme.breakpoints.down("sm")]: {
      fontSize: "15px",
      borderColor: alpha(onClassColorTheme.darkGrey, 0.2),
    },
  },
  comments: {
    borderTop: "1px solid rgba(191, 191,191, 0.2)",
    display: "flex",
    paddingTop: "10px",
    gap: "15px",
    bottom: "0",
  },
}));
