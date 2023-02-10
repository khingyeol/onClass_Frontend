import { Box, useMediaQuery } from "@mui/material";
import { FC, memo, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import ClassDetail from "../components/Class/ClassDetail";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import HomeNavigation from "./Navigation";
import { appBarHeightSm, appBarHeightXs } from "./HomeLayout";
import { getfromClass } from "../services/class/api_class";
import { updateClassDetail } from "../store/classsdetail/action";
import { GetAllClassResponseData } from "../services/types/getAllClassResponse";
import { useDispatch } from "react-redux";

const ClassLayout: FC = (props) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { classid } = useParams();

  const fetchGetFromClass = async (id: string) => {
    try {
      const res = await getfromClass(id);
        const data: GetAllClassResponseData = {
          ...res.data.data,
          teacher: res.data.data.teacher[0]          
        }
        dispatch(updateClassDetail(data));
    } catch (err: any) {
      navigate("/home");
    }
  };

  useEffect(() => {
    console.log("classid", classid);
    if (classid) fetchGetFromClass(classid);
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
        {/* {isDesktop ? <ClassDetail /> : null} */}
      </Box>
    </>
  );
};
export default memo(ClassLayout);

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
