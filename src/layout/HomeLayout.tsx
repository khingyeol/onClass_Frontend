import { Box, useMediaQuery } from "@mui/material";
import { FC, memo, useEffect, useMemo } from "react";
import HomeNavigation from "./Navigation";
import { useParams } from "react-router";
import { makeStyles } from "@mui/styles";
import { alpha, Theme, useTheme } from "@mui/material/styles";
import ClassDetail from "../components/Class/ClassDetail";
import HomePage from "../screen/Home/HomePage";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import HomeAssignments from "../screen/Home/HomeAssignments";

const useStyles = makeStyles((theme: Theme) => ({
  navBox: {
    display: "flex",
  },
  mainComponent: {
    display: "flex",
    justifyContent: "center",
    padding: "8px",
    margin: "6px 14px",
    flexGrow: 1,
  },
}));

const HomeLayout: FC = (props) => {
  // const HomeLayout: FC<{ children: any }> = (props: { children: any }) => {
  //   const { children } = props;
  const classes = useStyles();
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));

  return (
    <>
      <Box
        className={classes.navBox}
        marginTop={`${isDesktop ? appBarHeightSm : appBarHeightXs}px`}
      >
        {/* Header + NavBar */}
        <HomeNavigation type={"home"} />

        {/* Content */}
        <Box component="main" className={classes.mainComponent}>
          {/* <Routes> */}
          <Outlet />
          {/* <Route path="/" element={<Navigate to="/home" />} />
            <Route
              path="/home"
              element={
                <Box width="100%">
                  <HomePage />
                </Box>
              }
            />
            <Route
              path="/assignments"
              element={
                <Box width="100%" maxWidth={"1060px"}>
                  <HomeAssignments />
                </Box>
              }
            /> */}
          {/* </Routes> */}
        </Box>
      </Box>
    </>
  );
};
export default memo(HomeLayout);

export const navBarWidthSm = 90;
export const navBarWidthMd = 320;
export const appBarHeightSm = 127;
export const appBarHeightXs = 54;
