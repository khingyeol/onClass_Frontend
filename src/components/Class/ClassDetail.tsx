import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { FC, useEffect, useMemo, useState } from "react";
import { makeStyles } from "@mui/styles";
import { onClassColorTheme } from "../../common/theme/onClassColorTheme";
import OCIconButton from "../../common/OCIconButton";
import IconMail from "../../assets/svg/icon_mail.svg";
import IconPhone from "../../assets/svg/icon_phone.svg";
import IconClipboard from "../../assets/svg/icon_clipboard.svg";
import { GetClassResponseData } from "../../services/types/getClassResponse";
import OCAvatar from "../../common/OCAvatar";
import ChatPopUpDialog from "../Main/ChatPopUp";
import IconComment from "../../assets/svg/icon_comment.svg";
import {
  gql,
  useLazyQuery,
  useMutation,
  useSubscription,
} from "@apollo/client";
import { useSelector } from "react-redux";
import { getUserData } from "../../store/userdata/selector";

interface ClassDetailProps {
  classDetail: GetClassResponseData;
}

const SENDPRIVATEMESSAGE_MUTAION = gql`
  mutation SendPrivateMessage(
    $receiverId: String!
    $senderId: String!
    $teacherId: String!
    $content: String!
    $classCode: String!
  ) {
    sendPrivateMessage(
      receiver_id: $receiverId
      sender_id: $senderId
      teacher_id: $teacherId
      content: $content
      class_code: $classCode
    )
  }
`;

const GETPRIVATEMESSAGES_QUERY = gql`
  query GetPrivateMessages(
    $teacherId: String!
    $studentId: String!
    $classCode: String!
  ) {
    getPrivateMessages(
      teacher_id: $teacherId
      student_id: $studentId
      class_code: $classCode
    ) {
      id
      sender_id
      conversation_id
      content
      sender_name
      created
    }
  }
`;

const ONNEWMESSAGE_SUBSCRIPTION = gql`
  subscription OnNewMessage(
    $teacherId: String!
    $studentId: String!
    $classCode: String!
  ) {
    onNewMessage(
      teacher_id: $teacherId
      student_id: $studentId
      class_code: $classCode
    ) {
      message {
        id
        sender_id
        conversation_id
        content
        sender_name
        created
      }
      participants
    }
  }
`;

const ClassDetail: FC<ClassDetailProps> = (props) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const { classDetail } = props;
  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [chatName, setChatName] = useState<string>("");
  const [receiverId, setReceiverId] = useState<string>("");
  const [hideBadge, setHideBadge] = useState<
    { user_id: string; hide: boolean }[]
  >([]);
  const userData = useSelector(getUserData);

  const [qData, setQData] = useState<any[]>([]);
  const [getPrivateMessages, { data, loading, error }] = useLazyQuery(
    GETPRIVATEMESSAGES_QUERY
  );

  const [sendPrivateMessage] = useMutation(SENDPRIVATEMESSAGE_MUTAION);

  if (classDetail?.role === "teacher") {
    for (let i = 0; i < classDetail?.nickname?.length; i++) {
      if (userData.user_id === classDetail?.nickname[i]?.user_id) continue;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const subscriptionOnNewMessage = useSubscription(
        ONNEWMESSAGE_SUBSCRIPTION,
        {
          variables: {
            teacherId: classDetail?.teacher[0]?.user_id,
            studentId: classDetail?.nickname[i]?.user_id,
            classCode: classDetail?.class_code,
          },
          onData: ({ data }) => {
            if (!data.loading) {
              const temp = qData;
              temp.push(data.data.onNewMessage.message);
              setQData(temp);

              var tempHideBadge = [...hideBadge];
              for (let j = 0; j < hideBadge.length; j++) {
                if (hideBadge[j].user_id === classDetail?.nickname[i]?.user_id) {
                  tempHideBadge[j].hide = chatOpen;
                }
              }
              setHideBadge(tempHideBadge);
              console.log("MYLOG", tempHideBadge);
            }
          },
        }
      );
    }
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const subscriptionOnNewMessage = useSubscription(
      ONNEWMESSAGE_SUBSCRIPTION,
      {
        variables: {
          teacherId: classDetail?.teacher[0]?.user_id,
          studentId: userData.user_id,
          classCode: classDetail?.class_code,
        },
        onData: ({ data }) => {
          if (!data.loading) {
            const temp = qData;
            temp.push(data.data.onNewMessage.message);
            setQData(temp);

            var tempHideBadge = [...hideBadge];
            for (let i = 0; i < hideBadge.length; i++) {
              if (hideBadge[i].user_id === classDetail?.teacher[0]?.user_id) {
                tempHideBadge[i].hide = chatOpen;
              }
            }
            setHideBadge(tempHideBadge);
            console.log("MYLOG", tempHideBadge);
          }
        },
      }
    );
  }

  const handleOnOpenChat = (receiver_id: string, chatName: string) => {
    setChatName(chatName);
    setReceiverId(receiver_id);
    setChatOpen(true);

    //badge
    var tempHideBadge = [...hideBadge];
    for (let i = 0; i < hideBadge.length; i++) {
      if (
        hideBadge[i].user_id ===
        (classDetail?.role === "student"
          ? classDetail?.teacher[0]?.user_id
          : receiver_id)
      ) {
        tempHideBadge[i].hide = true;
      }
    }
    setHideBadge(tempHideBadge);

    getPrivateMessages({
      variables: {
        teacherId: classDetail?.teacher[0]?.user_id,
        studentId:
          classDetail?.role === "teacher" ? receiver_id : userData.user_id,
        classCode: classDetail?.class_code,
      },
      fetchPolicy: "network-only",
    });
  };

  const onTappedSendMessage = async (content: string) => {
    const teacherId = classDetail?.teacher[0].user_id;
    sendPrivateMessage({
      variables: {
        receiverId,
        senderId: userData.user_id,
        teacherId,
        content,
        classCode: classDetail?.class_code,
      },
    });
  };

  useMemo(() => {
    if (data) {
      setQData(data.getPrivateMessages);
    }
  }, [data]);

  useEffect(() => {
    if (classDetail?.role === "student") {
      setHideBadge([{ user_id: classDetail?.teacher[0]?.user_id, hide: true }]);
    } else {
      const tempBadge = [];
      for (let i = 0; i < classDetail?.student?.length; i++) {
        tempBadge.push({ user_id: classDetail?.student[i]?.user_id, hide: true });
      }
      setHideBadge(tempBadge);
    }
  }, []);
  // badge visible get from subscription onNewMessage -> with sender id as a key

  return (
    <Box>
      <ChatPopUpDialog
        open={chatOpen}
        chatName={chatName}
        messages={qData}
        onClose={() => setChatOpen(false)}
        onSendMessage={(c) => onTappedSendMessage(c)}
      />
      <Box className={classes.class_list}>
        <Box position="relative" paddingBottom="10px">
          <Box
            className={classes.head}
            padding="1.2rem"
            sx={{
              backgroundSize: "cover",
              backgroundImage: `url(${
                classDetail?.class_thumbnail ??
                "https://img.freepik.com/free-vector/christmas-holiday-golden-pattern-background-template-greeting-card-design_206636-74.jpg?size=626&ext=jpg"
              })`,
            }}
          >
            <Typography variant="h2">{classDetail?.class_name}</Typography>
            <Typography variant="description">
              {classDetail?.class_section}
            </Typography>
          </Box>
        </Box>

        <Box display="grid" paddingX="1.2rem" gap="15px">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              wordBreak: "break-all",
            }}
          >
            <Typography variant="h4" display="inline">
              class code:{" "}
            </Typography>
            {classDetail?.class_code}
            <OCIconButton
              icon={IconClipboard}
              bgColor={"alpha(color, 0.1)"}
              color={onClassColorTheme.grey}
              size="25px"
              onClick={() =>
                navigator.clipboard.writeText(classDetail?.class_code)
              }
            />
          </div>
          {classDetail?.class_subject && (
            <div style={{ wordBreak: "break-all" }}>
              <Typography variant="h4" display="inline">
                subject:{" "}
              </Typography>
              {classDetail?.class_subject}
            </div>
          )}
          {classDetail?.class_room && (
            <div style={{ wordBreak: "break-all" }}>
              <Typography variant="h4" display="inline">
                room:{" "}
              </Typography>
              {classDetail?.class_room}
            </div>
          )}
          {classDetail?.class_description && (
            <div style={{ wordBreak: "break-all" }}>
              <Typography variant="h4" display="inline">
                describe:{" "}
              </Typography>
              {classDetail?.class_description ?? ""}
            </div>
          )}
        </Box>

        <Box bottom={0} paddingY="1.2em">
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            flexGrow={1}
            gap={1}
          >
            <Box sx={{ display: "flex" }}>
              <OCAvatar
                width={isDesktop ? 90 : 28}
                height={isDesktop ? 90 : 28}
                sx={{
                  alignSelf: "center",
                }}
                src={classDetail?.teacher[0]?.profile_pic ?? ""}
              />
              {classDetail?.role === "student" && (
                <Badge
                  color="error"
                  variant="dot"
                  invisible={hideBadge.length > 0 && hideBadge[0].hide}
                >
                  <OCIconButton
                    icon={IconComment}
                    color={onClassColorTheme.grey}
                    size={"45px"}
                    onClick={() =>
                      handleOnOpenChat(
                        classDetail?.teacher[0].user_id,
                        `${classDetail?.teacher[0].name.firstname} ${classDetail?.teacher[0].name.lastname}`
                      )
                    }
                  />
                </Badge>
              )}
            </Box>
            <Typography fontSize="auto">{`${classDetail?.teacher[0]?.name?.firstname} ${classDetail?.teacher[0]?.name?.lastname}`}</Typography>

            <Box justifyContent="flex-start" display="grid" gap="8px">
              <Box display="flex" alignItems="center" gap="10px">
                <OCIconButton
                  icon={IconMail}
                  color={onClassColorTheme.grey50}
                  size={"35px"}
                />
                <Typography fontSize="20" color={onClassColorTheme.grey}>
                  {classDetail?.teacher[0]?.email}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap="10px">
                <OCIconButton
                  icon={IconPhone}
                  color={onClassColorTheme.grey50}
                  size={"35px"}
                />
                <Typography fontSize="20" color={onClassColorTheme.grey}>
                  {classDetail?.teacher[0]?.optional_contact}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box padding={1.5}></Box>
      <Box className={classes.class_list}>
        <Box className={classes.content}>
          <Typography variant="h4" display="inline">
            {`Attendees (${classDetail?.student.length})`}
          </Typography>
          <Box className={classes.attendees}>
            {classDetail?.student.map((item, index) => {
              return (
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box className={classes.student}>
                    <OCAvatar
                      width={45}
                      height={45}
                      sx={{
                        alignSelf: "center",
                      }}
                      src={item?.profile_pic ?? ""}
                    />
                    {`${item.name.firstname} ${item.name.lastname}`}
                  </Box>
                  {classDetail?.role === "teacher" && (
                    <Box>
                      <Badge
                        color="error"
                        variant="dot"
                        invisible={
                          hideBadge.length > 0 && hideBadge[index].hide
                        }
                      >
                        <OCIconButton
                          icon={IconComment}
                          color={onClassColorTheme.grey}
                          size={"45px"}
                          onClick={() =>
                            handleOnOpenChat(
                              item.user_id,
                              `${item.name.firstname} ${item.name.lastname}`
                            )
                          }
                        />
                      </Badge>
                    </Box>
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default ClassDetail;

const useStyles = makeStyles((theme: Theme) => ({
  class_list: {
    display: "inline-block",
    boxShadow: "0px 10px 19px rgba(0, 0, 0, 0.16)",
    borderRadius: "35px",
    overflow: "hidden",
    width: "340px",
    backgroundColor: onClassColorTheme.white,
    margin: "0px 50px 0px 10px",
    transition: "all 0.4s ease",
    [theme.breakpoints.down("lg")]: {
      width: "306px",
      margin: "0px 15px 0px 10px",
    },
  },
  coverImg: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
  },
  head: {
    wordBreak: "break-word",
    whiteSpace: "pre-line",
    height: "auto",
  },
  content: {
    padding: "1.2rem",
  },
  attendees: {
    padding: "10px 0 0 0",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  student: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    fontSize: "auto",
    // alignSelf: "center"
  },
}));
