import { Avatar, Box, Theme, Typography, useMediaQuery } from "@mui/material";
import { FC, memo } from "react";
import { makeStyles } from "@mui/styles";
import { onClassColorTheme } from "../../common/theme/onClassColorTheme";
import dummyTeacher from "../../assets/image/dummy-teacher.png";
import OCIconButton from "../../common/OCIconButton";
import IconMail from "../../assets/svg/icon_mail.svg";
import IconPhone from "../../assets/svg/icon_phone.svg";

const useStyles = makeStyles((theme: Theme) => ({
  class_list: {
    display: "inline-block",
    // position: "relative",
    boxShadow: "0px 10px 19px rgba(0, 0, 0, 0.16)",
    borderRadius: "35px",
    overflow: "hidden",
    // whiteSpace: "nowrap",
    // textOverflow: "ellipsis",
    width: "340px",
    // height: "500px",
    backgroundColor: onClassColorTheme.white,
    margin: "0px 50px 0px 10px",
    transition: "all 0.4s ease",
    [theme.breakpoints.down("lg")]: {
      width: "306px",
      margin: "0px 15px 0px 10px",
    },
  },
  coverImg: {
    // top: "20px",
    // position: "absolute",
    objectFit: "cover",
    width: "100%",
    height: "100%",
  },
}));

const mockedSocial = {
  mail: "sitthichai_1999@swu.com",
  phone: "+66 123 456 789",
  facebook: "Sitthichai Vachi",
  line: "ginger_khing",
};

const ClassDetail: FC = () => {
  const classes = useStyles();
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));

  return (
    <Box>
      <Box className={classes.class_list}>
        <Box height="100%" position="relative">
          <Box position="absolute" padding="1.2rem">
            <Typography variant="h2">{"Cyber Coding 2565"}</Typography>
            <Typography variant="description">{"B02"}</Typography>
          </Box>
          <img
            src="https://img.freepik.com/free-vector/christmas-holiday-golden-pattern-background-template-greeting-card-design_206636-74.jpg?size=626&ext=jpg"
            className={classes.coverImg}
            alt="cover-img"
          />
        </Box>

        <Box display="grid" paddingX="1.2rem" gap="15px">
          <div style={{ wordBreak: "break-all" }}>
            {/* <h4>class code : </h4>item.class_cossssssssssssssdsssssssssde<br /> */}
            <Typography variant="h4" display="inline">
              class code:{" "}
            </Typography>
            CODE808
          </div>
          <div style={{ wordBreak: "break-all" }}>
            <Typography variant="h4" display="inline">
              subject:{" "}
            </Typography>
            Coding
          </div>
          <div style={{ wordBreak: "break-all" }}>
            <Typography variant="h4" display="inline">
              room:{" "}
            </Typography>
            1102
          </div>
          <div style={{ wordBreak: "break-all" }}>
            <Typography variant="h4" display="inline">
              describe:{" "}
            </Typography>
            ศึกษาเกี่ยวกับแนวคิดและทฤษ๓ีทางจิตวิทยา โครงสร้างและการทำงานของจิต
            การเรียนรู้ การรับรู้ แรงจูงใจ ความเชื่อ เจคคติ
          </div>
        </Box>

        <Box bottom={0} padding="1.2em">
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            flexGrow={1}
            gap={1}
          >
            <Avatar
              sx={{
                width: isDesktop ? 90 : 28,
                height: isDesktop ? 90 : 28,
                boxSizing: "border-box",
                border: "1px solid #707070",
                alignSelf: "center",
              }}
              alt="profile-image"
              src={dummyTeacher}
            />
            <Typography fontSize="24px">Juan Wong</Typography>

            <Box justifyContent="flex-start" display="grid" gap="8px">
              <Box display="flex" alignItems="center" gap="10px">
                <OCIconButton
                  icon={IconMail}
                  color={onClassColorTheme.grey50}
                  size={"35px"}
                />
                <Typography fontSize="20" color={onClassColorTheme.grey}>
                  Juan.W@g.swu.com
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap="10px">
                <OCIconButton
                  icon={IconPhone}
                  color={onClassColorTheme.grey50}
                  size={"35px"}
                />
                <Typography fontSize="20" color={onClassColorTheme.grey}>
                  +66 287 654 879
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default ClassDetail;
