import {
  Box,
  Button,
  Drawer,
  Hidden,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { FC, useState } from "react";
import NavListClass from "../assets/svg/icon_class.svg";
import NavListAsm from "../assets/svg/icon_asm.svg";
import NavInfo from "../assets/svg/icon_info.svg";
import NavSetting from "../assets/svg/icon_setting.svg";
import { onClassColorTheme } from "../common/theme/onClassColorTheme";
import NavCallClass from "../components/Main/Navigation/NavCallClass";
import OCIconButton from "../common/OCIconButton";
import NavList from "../components/Main/Navigation/NavList";
import {
  navBarWidthSm,
  navBarWidthMd,
  appBarHeightSm,
  appBarHeightXs,
} from "./HomeLayout";
import { alpha, Theme } from "@mui/material/styles";
import Header from "./Header";
import { makeStyles } from "@mui/styles";
import ChevronRight from "../assets/svg/chevron-right.svg";
import ChevronLeft from "../assets/svg/chevron-left.svg";
import NavClassMenu from "../components/Main/Navigation/NavClassMenu";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentStage, AllStageType } from "../store/stage/action";
import { getClassDetail } from "../store/classsdetail/selector";
import { useNavigate } from "react-router-dom";

const Navigation: FC<{ type: "home" | "class" }> = (props) => {
  const { type } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const [open, setOpen] = useState(false);
  const [openDesktop, setOpenDesktop] = useState(true);
  const classDetail = useSelector(getClassDetail);

  const drawerManage = isDesktop ? openDesktop : true;

  const handleDrawer = () => {
    setOpen(!open);
  };

  const handleDesktopDrawer = () => {
    setOpenDesktop(!openDesktop);
    console.log(openDesktop);
  };

  const CollapseBtn = () => {
    return (
      <Button
        onClick={() => handleDesktopDrawer()}
        sx={{
          width: "60px",
          height: "60px",
          borderRadius: "20px",
          margin: "10px",
          display: `${isDesktop ? "" : "none"}`,
          alignSelf: "center",
          ":hover": {
            backgroundColor: alpha(onClassColorTheme.grey, 0.2),
          },
          "&& .MuiTouchRipple-child": {
            backgroundColor: onClassColorTheme.darkGrey,
          },
        }}
      >
        {drawerManage ? (
          <img
            width="28px"
            height="28px"
            src={ChevronLeft}
            alt="chevron-right"
          />
        ) : (
          <img
            width="28px"
            height="28px"
            src={ChevronRight}
            alt="chevron-right"
          />
        )}
      </Button>
    );
  };

  const SettingsBar = () => {
    return (
      <Box
        display={drawerManage ? "" : "none"}
        className={classes.settingBox}
        sx={{
          bottom: { xs: "0", sm: `${appBarHeightSm}px` },
        }}
      >
        <div className={classes.settingItems}>
          <OCIconButton
            onClick={() => navigate("/info")}
            icon={NavInfo}
            color={onClassColorTheme.grey}
            size={"60px"}
          />
          <OCIconButton
            onClick={() => navigate("/setting")}
            icon={NavSetting}
            color={onClassColorTheme.grey}
            size={"60px"}
          />
        </div>
      </Box>
    );
  };

  const drawerClass = (
    <>
      <Box className={classes.drawerBox}>
        <CollapseBtn />

        <Box
          display={drawerManage ? "" : "none"}
          width={drawerManage ? navBarWidthMd : navBarWidthSm}
          className={classes.drawerContent}
          height={{
            xs: "calc(100% - 90px)",
            sm: `calc(100% - ${appBarHeightSm + 90 + 25 + 60}px)`,
          }}
        >
          <Box display="flex" alignItems="center">
            <Button
              onClick={() => dispatch(updateCurrentStage(AllStageType.HOME))}
              sx={{
                // width: "40px",
                // height: "40px",
                borderRadius: "36px",
                // margin: "10px",
                // display: `${isDesktop ? "" : "none"}`,
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
                width={isDesktop ? "36px" : "30px"}
                height={isDesktop ? "36px" : "30px"}
                src={NavListClass}
                alt="chevron-right"
              />
            </Button>

            <img
              width="17px"
              height="17px"
              src={ChevronRight}
              alt="chevron-right"
            />

            <Typography variant="h3" paddingLeft="12px" noWrap>
              {classDetail.class_name}
            </Typography>
          </Box>

          <NavClassMenu />

          {/*  */}
        </Box>
        <SettingsBar />
      </Box>
    </>
  );

  const drawerContent = (
    <>
      <Box className={classes.drawerBox}>
        <CollapseBtn />

        <Box
          display={drawerManage ? "" : "none"}
          width={drawerManage ? navBarWidthMd : navBarWidthSm}
          className={classes.drawerContent}
          height={{
            xs: "calc(100% - 90px)",
            sm: `calc(100% - ${appBarHeightSm + 90 + 25 + 60}px)`,
          }}
        >
          <NavList title={"ชั้นเรียน"} icon={NavListClass} path={"/home"}>
            <NavCallClass />
          </NavList>
          <NavList title="งานมอบหมาย" icon={NavListAsm} path={"/assignments"} />
        </Box>

        <SettingsBar />
      </Box>
    </>
  );

  return (
    <>
      <Header handleDrawer={handleDrawer} />

      {/* Mobile Drawer */}
      <Hidden smUp key="mobile-drawer">
        <Drawer open={open} onClose={handleDrawer}>
          {type === "home"
            ? drawerContent
            : type === "class"
            ? drawerClass
            : drawerContent}
        </Drawer>
      </Hidden>

      {/* Desktop Drawer */}
      <Hidden smDown key="desktop-drawer">
        <Drawer
          variant="permanent"
          open={openDesktop}
          sx={{
            width: openDesktop ? navBarWidthMd : navBarWidthSm,
            "& .MuiDrawer-paper": {
              width: openDesktop ? navBarWidthMd : navBarWidthSm,
            },
          }}
          className={classes.desktopDrawer}
        >
          {type === "home"
            ? drawerContent
            : type === "class"
            ? drawerClass
            : drawerContent}
        </Drawer>
      </Hidden>
    </>
  );
};

export default Navigation;

const useStyles = makeStyles((theme: Theme) => ({
  drawerBox: {
    height: "100%",
    width: "auto",
    marginTop: "25px",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      marginTop: appBarHeightXs,
    },
  },
  drawerContent: {
    // The Content inside (exclude the Button)
    overflowX: "hidden",
    overflowY: "auto",
  },
  laptopDrawer: {
    width: navBarWidthSm,
    transition: "all 0.4s ease",
    "& .MuiDrawer-paper": {
      transition: "all 0.4s ease",
      width: navBarWidthSm,
      borderTopRightRadius: "50px",
      marginTop: `${appBarHeightSm}px`,
      justifyContent: "flex-start",
      overflowX: "hidden",
      backgroundColor: onClassColorTheme.white,
      boxShadow: "0px 10px 19px rgba(0, 0, 0, 0.16)",
    },
  },
  laptopBox: {
    width: navBarWidthSm,
    padding: "10px",
    marginTop: "30px",
  },
  desktopDrawer: {
    // The whole Drawer Box one
    transition: "all 0.4s ease",
    "& .MuiDrawer-paper": {
      transition: "all 0.4s ease",
      borderTopRightRadius: "50px",
      marginTop: `${appBarHeightSm}px`,
      justifyContent: "flex-start",
      overflowX: "hidden",
      backgroundColor: onClassColorTheme.white,
      boxShadow: "0px 10px 19px rgba(0, 0, 0, 0.16)",
    },
  },
  settingBox: {
    position: "absolute",
    width: "100%",
  },
  settingItems: {
    display: "flex",
    justifyContent: "space-between",
    padding: "25px",
  },
}));
