import {
  Box,
  List,
  Stack,
  Typography,
  alpha,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { FC, useState, useEffect, useRef } from "react";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import OCTextField from "../../common/OCTextfield";
import { onClassColorTheme } from "../../common/theme/onClassColorTheme";
import CloseIcon from "../../assets/svg/icon_close.svg";
import OCIconButton from "../../common/OCIconButton";
import IconSend from "../../assets/svg/icon_send.svg";
import { formatTime } from "../../utils/formatDate";
import { useSelector } from "react-redux";
import { getUserData } from "../../store/userdata/selector";

interface ChatPopUpDialogProps {
  open: boolean;
  chatName: string;
  messages: any[];
  onClose: () => void;
  onSendMessage: (content: string) => void;
}

const ChatPopUpDialog: FC<ChatPopUpDialogProps> = (props) => {
  const { open, chatName, messages, onClose, onSendMessage } = props;
  const classes = useStyles();
  const theme = useTheme();
  const isLargerThanMd = useMediaQuery(theme.breakpoints.up("md"));
  const messagesEndRef = useRef<HTMLInputElement | null>(null);
  const userData = useSelector(getUserData);

  const [content, setContent] = useState<string>("");

  useEffect(() => {
    scrollToBottom();
  }, [messages.length])

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth"
      });
    }
  };

  const onTappedSendMessage = () => {
    if (content !== "") {
      setContent("");
      onSendMessage(content);
    }
  };

  const MessageBubble = (
    id: string,
    side: string,
    content: string,
    created: string
  ) => {
    switch (side) {
      case "left":
        return (
          <Box key={id}>
            <Box className={classes.messageLeftBox}>
              <Typography
                variant="description"
                color={onClassColorTheme.white}
                className={classes.messageLeft}
              >
                {content}
              </Typography>
            </Box>
            <Box className={classes.messageTimeLeft}>
              <Typography variant="caption" color={onClassColorTheme.darkGrey}>
                {formatTime(created)}
              </Typography>
            </Box>
          </Box>
        );
      case "right":
        return (
          <Box key={id}>
            <Box className={classes.messageRightBox}>
              <Typography
                variant="description"
                color={onClassColorTheme.white}
                className={classes.messageRight}
              >
                {content}
              </Typography>
            </Box>
            <Box className={classes.messageTimeRight}>
              <Typography variant="caption" color={onClassColorTheme.darkGrey}>
                {formatTime(created)}
              </Typography>
            </Box>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box
      padding="20px"
      className={classes.popUpDialog}
      sx={{ visibility: open ? "visible" : "hidden" }}
    >
      <Stack>
        <>
          <Box
            sx={{
              padding: 0.5,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="title3" color={onClassColorTheme.white}>
              {chatName}
            </Typography>
            <OCIconButton
              icon={CloseIcon}
              color={onClassColorTheme.white}
              size={"30px"}
              bgColor={"alpha(color, 0.1)"}
              onClick={onClose}
            />
          </Box>
        </>
        <Box className={classes.main}>
          {/* CHAT BOX */}
          <Box
            sx={{
              height: isLargerThanMd ? "85%" : "80%",
              backgroundColor: onClassColorTheme.white,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: alpha(onClassColorTheme.grey50, 0.3),
                width: "100%",
              }}
            >
              message will delete after 1 day
            </Typography>
            <List sx={{ maxHeight: "91.5%", marginLeft: 2, overflow: "auto" }}>
              {messages.map((val, index) =>
                MessageBubble(
                  val.id,
                  val.sender_id === userData.user_id ? "right" : "left",
                  val.content,
                  val.created
                )
              )}
              <div ref={messagesEndRef} />
            </List>
          </Box>
          {/* INPUT */}
          <Box
            sx={{
              backgroundColor: alpha(onClassColorTheme.white, 0.85),
              height: "15%",
              paddingX: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <OCTextField
              placeholder="Enter a message"
              maxWidth={isLargerThanMd ? "17em" : "70%"}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
            <OCIconButton
              icon={IconSend}
              color={onClassColorTheme.grey}
              size={"45px"}
              onClick={onTappedSendMessage}
            />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default ChatPopUpDialog;

const useStyles = makeStyles((theme: Theme) => ({
  popUpDialog: {
    backgroundColor: onClassColorTheme.primary,
    position: "fixed",
    [theme.breakpoints.down("md")]: {
      height: "100vh",
      width: "calc(100% - 40px)",
      top: 0,
      left: 0,
      zIndex: 99999,
    },
    [theme.breakpoints.up("md")]: {
      width: "20em",
      height: "33em",
      bottom: 20,
      right: 20,
      borderRadius: "25px",
      zIndex: 2,
    },
    boxShadow: "0 8px 24px 0 rgba(0,0,0,0.12)",
  },
  main: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: "88%",
    width: "100%",
    borderBottomLeftRadius: "25px",
    borderBottomRightRadius: "25px",
    overflow: "hidden",
    backgroundColor: onClassColorTheme.black,
  },
  messageLeftBox: {
    display: "flex",
    justifyContent: "flex-start",
    margin: theme.spacing(1, 4, 0.5, 0),
  },
  messageRightBox: {
    display: "flex",
    justifyContent: "flex-end",
    margin: theme.spacing(0.5, 2, 1, 2),
  },
  messageLeft: {
    backgroundColor: alpha(onClassColorTheme.grey, 0.4),
    padding: theme.spacing(1, 2),
    borderRadius: theme.spacing(1.5),
    marginBottom: 4,
    display: "inline-block",
    wordBreak: "break-word",
  },
  messageRight: {
    backgroundColor: alpha(onClassColorTheme.primary, 0.6),
    padding: theme.spacing(1, 2),
    borderRadius: theme.spacing(1.5),
    marginBottom: 4,
    display: "inline-block",
    wordBreak: "break-word",
  },
  messageTimeLeft: {
    display: "flex",
    justifyContent: "flex-start",
  },
  messageTimeRight: {
    display: "flex",
    justifyContent: "flex-end",
    marginRight: theme.spacing(2),
  },
}));
