import {
  alpha,
  Avatar,
  Box,
  Button,
  Dialog,
  TextField,
  Theme,
  useMediaQuery,
} from "@mui/material";
import { FC, memo, useState } from "react";
import { makeStyles } from "@mui/styles";
import { onClassColorTheme } from "../../common/theme/onClassColorTheme";
import dummyPic from "../../assets/image/dummypic.png";
import IconSend from "../../assets/svg/icon_send.svg";
import IconClose from "../../assets/svg/icon_close.svg";
import { useSelector } from "react-redux";
import { getClassId } from "../../store/classsdetail/selector";

const useStyles = makeStyles((theme: Theme) => ({
  postbox: {
    gap: "10px",
    justifyContent: "space-between",
    alignContent: "center",
    backgroundColor: onClassColorTheme.white,
    borderRadius: "35px",
    border: "1px solid",
    borderColor: alpha(onClassColorTheme.darkGrey, 0.3),
    padding: "20px 30px",
    display: "flex",
    transition: "all 0.4s ease",
    "&:hover": {
      borderColor: alpha(onClassColorTheme.green, 0.3),
    },
    [theme.breakpoints.down("md")]: {
      padding: "20px 15px",
    },
    [theme.breakpoints.down("sm")]: {
      cursor: "pointer",
      minHeight: "69px",
      padding: "0px 35px",
      borderRadius: "35px",
      color: onClassColorTheme.grey,
    },
  },
  input: {
    justifySelf: "stretch",
    height: "100%",
    width: "100%",
    "& .MuiOutlinedInput-root": {
      color: onClassColorTheme.black,
      backgroundColor: onClassColorTheme.white,
      "& fieldset": {
        border: 0,
        borderWidth: 0,
        height: "43px",
        borderRadius: "23px",
      },
      "&.Mui-focused fieldset": {
        borderColor: onClassColorTheme.primary,
        height: "43px",
        borderRadius: "23px",
      },
    },
  },
  inputXS: {
    justifySelf: "stretch",
    height: "100%",
    width: "100%",
    // margin: "40px",
    "& .MuiOutlinedInput-root": {
      color: onClassColorTheme.black,
      backgroundColor: onClassColorTheme.white,
      "& fieldset": {
        padding: "10px",
        border: "1px solid #DADADA",
        borderWidth: 1,
        // height: "43px",
        borderRadius: "10px",
      },
      "&.Mui-focused fieldset": {
        borderColor: '#DADADA',
        // height: "43px",
        borderRadius: "10px",
      },
    },
  },
  dialog: {
    // backgroundColor: onClassColorTheme.white,
    // borderRadius: "35px",
    // border: "1px solid",
    // borderColor: alpha(onClassColorTheme.darkGrey, 0.3),
    padding: "20px",
    // width: "80%",
  },
}));

const PostBox: FC = () => {
  const classid = useSelector(getClassId);
  const classes = useStyles();
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const [openPostBox, setOpenPostBox] = useState(false);

  const handleClickDialog = () => {
    setOpenPostBox(!openPostBox);
  };

  const [inputs, setInputs] = useState({
    class_code: classid,
    data: {
      type: "normal",
      post_content: "",
      post_optional_file: [],
    },
  });

  const CloseButton = () => {
    return (
      <Button
        onClick={handleClickDialog}
        sx={{
          width: { xs: "40px", sm: "60px" },
          height: { xs: "40px", sm: "60px" },
          borderRadius: { xs: "10px", sm: "20px" },
          padding: "0px",
          // backgroundColor: alpha(onClassColorTheme.grey, 0.1),
          alignSelf: "center",
          ":hover": {
            backgroundColor: alpha(onClassColorTheme.grey, 0.2),
          },
          "&& .MuiTouchRipple-child": {
            backgroundColor: onClassColorTheme.darkGrey,
          },
        }}
      >
        <img
          width={isDesktop ? "28px" : "24px"}
          height={isDesktop ? "28px" : "24px"}
          src={IconClose}
          alt="icon-send"
        />
      </Button>
    );
  };

  const PostButton = () => {
    return (
      <Button
        onClick={handleClickDialog}
        sx={{
          width: { xs: "40px", sm: "60px" },
          height: { xs: "40px", sm: "60px" },
          borderRadius: { xs: "10px", sm: "20px" },
          backgroundColor: alpha(onClassColorTheme.grey, 0.1),
          alignSelf: "center",
          ":hover": {
            backgroundColor: alpha(onClassColorTheme.grey, 0.2),
          },
          "&& .MuiTouchRipple-child": {
            backgroundColor: onClassColorTheme.darkGrey,
          },
        }}
      >
        <img
          width={isDesktop ? "28px" : "24px"}
          height={isDesktop ? "28px" : "24px"}
          src={IconSend}
          alt="icon-send"
        />
      </Button>
    );
  };

  const PostBoxDialog = () => {
    return (
      <Dialog
        open={openPostBox}
        onClose={handleClickDialog}
        PaperProps={{
          style: {
            borderRadius: "35px",
            width: "100%",
            height: "50%",
          },
        }}
      >
        <Box className={classes.dialog}>
          <Box display="flex" justifyContent="space-between" marginBottom="10px">
            <CloseButton />
            <PostButton />
          </Box>
          <Box flexGrow={1} >
          <TextField
          className={classes.inputXS}
          type="normal"
          id="post_content"
          placeholder="say something..."
          rows={14}
          // fullWidth
          multiline
        />

          </Box>
        </Box>
      </Dialog>
    );
  };

  const XsPostBox = () => {
    return (
      <>
        <PostBoxDialog />
        <Box className={classes.postbox} onClick={handleClickDialog}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            say something...
          </Box>
        </Box>
      </>
    );
  };

  const SmPostBox = () => {
    return (
      <Box className={classes.postbox}>
        <Avatar
          sx={{
            width: isDesktop ? 60 : 28,
            height: isDesktop ? 60 : 28,
            boxSizing: "border-box",
            border: "1px solid #707070",
            alignSelf: "center",
          }}
          alt="profile-image"
          src={dummyPic}
        />

        <TextField
          className={classes.input}
          type="normal"
          id="post_content"
          placeholder="say something..."
          // rows={1}
          multiline
        />
        <PostButton />
      </Box>
    );
  };

  return isDesktop ? <SmPostBox /> : <XsPostBox />;
};
export default memo(PostBox);
