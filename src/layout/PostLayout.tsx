import { Box, useMediaQuery } from "@mui/material";
import { FC, memo, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import { Outlet, useParams } from "react-router-dom";
import HomeNavigation from "./Navigation";
import { appBarHeightSm, appBarHeightXs } from "./HomeLayout";
import UploadBox from "../screen/Post/UploadBox";
import { useSelector } from "react-redux";
import { getClassDetail } from "../store/classsdetail/selector";
import AsmTeacherBox from "../screen/Post/AsmTeacherBox";

const PostLayout: FC = (props) => {
  const classes = useStyles();
  const { classid, id } = useParams();
  const pathname = window.location.pathname;
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const type = window.location.pathname.split("/")[2].toUpperCase();
  const role = useSelector(getClassDetail).role;
  // const role =

  const renderUploadBox = () => {
    if (pathname === `/${classid}/assignment/${id}` && isDesktop) {
        if (role === "student") {
          return <UploadBox />;
        } else if (role === "teacher") {
          return <AsmTeacherBox />;
        }
    }
  };
  useEffect(() => {
    console.log(pathname);
  //   fetchGetPost();
  }, []);
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
        {renderUploadBox()}
        {/* {type === "ASSIGNMENT" && isDesktop ? <UploadBox /> : null} */}
      </Box>
    </>
  );
};
export default memo(PostLayout);

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
