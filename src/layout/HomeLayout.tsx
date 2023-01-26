import { Box, useMediaQuery } from "@mui/material";
import { FC, memo } from "react";
import HomeNavigation from "./Navigation";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { Outlet } from "react-router-dom";

const HomeLayout: FC = (props) => {
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
          <Outlet />
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
