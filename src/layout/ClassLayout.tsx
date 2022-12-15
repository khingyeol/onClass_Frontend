import { Box, useMediaQuery } from "@mui/material";
import { FC, memo, useEffect, useMemo } from "react";
import { useParams } from "react-router";
import { makeStyles } from "@mui/styles";
import { alpha, Theme, useTheme } from "@mui/material/styles";
import ClassDetail from "../components/Class/ClassDetail";
import { Outlet, Route, Routes } from "react-router-dom";
import HomeNavigation from "./Navigation";
import { appBarHeightSm, appBarHeightXs } from "./HomeLayout";
import ClassFeed from "../screen/Classroom/ClassFeed";
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

const ClassLayout: FC = (props) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));

  return (
    <>
      <Box
        className={classes.navBox}
        marginTop={`${isDesktop ? appBarHeightSm : appBarHeightXs}px`}
      >
        {/* Header + NavBar */}
        <HomeNavigation type={"class"} />
        {/* Content */}
        <Box component="main" className={classes.mainComponent}>
          <Box width="100%" maxWidth="1060px">
            <Outlet />
          </Box>
          {/* <Routes>
            <Route path="/" element={<ClassFeed />} />
            <Route path="/assignments" element={<HomeAssignments />} />
          </Routes> */}
        </Box>
        {isDesktop ? <ClassDetail /> : null}
      </Box>
    </>
  );
};
export default memo(ClassLayout);
