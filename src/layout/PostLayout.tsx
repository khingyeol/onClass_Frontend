import { Box, useMediaQuery } from "@mui/material";
import { FC, memo } from "react";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import HomeNavigation from "./Navigation";
import { appBarHeightSm, appBarHeightXs } from "./HomeLayout";

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

  const PostLayout: FC = (props) => {
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
        </Box>
        {/* If type = asignment -> show asmbox */}
        {/* {isDesktop ? <ClassDetail /> : null} */}
      </Box>
    </>
    )
  }
  export default memo(PostLayout);
