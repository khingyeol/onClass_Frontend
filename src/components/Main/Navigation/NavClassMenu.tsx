import { alpha, Box, Theme, Typography } from "@mui/material";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onClassColorTheme } from "../../../common/theme/onClassColorTheme";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { getClassId } from "../../../store/classsdetail/selector";
import { updateCurrentStage, AllStageType } from "../../../store/stage/action";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  class_list: {
    width: "73%",
    height: "55px",
    fontSize: "18px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    padding: "5px 0px 5px 17%",
    margin: "0 0 0 10%",
    "&:hover": {
      backgroundColor: alpha(onClassColorTheme.green, 0.1),
    },
    [theme.breakpoints.down("sm")]: {
      minHeight: "50px",
      paddingY: "10px",
    },
  },
}));

const NavClassMenu: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  const currentPath = window.location.pathname.substring(
    window.location.pathname.lastIndexOf("/")
  );
  // const classid = useSelector(getClassId);
  const { classid } = useParams();

  return (
    <>
      <Box
        className={classes.class_list}
        onClick={() => {
          navigate(`/${classid}`);
          dispatch(updateCurrentStage(AllStageType.CLASS));
        }}
        borderLeft={
          `/${classid}` === currentPath
            ? "6px solid #41B094"
            : "0px solid #41B094"
        }
        bgcolor={
          `/${classid}` === currentPath
            ? alpha(onClassColorTheme.green, 0.1)
            : "clear"
        }
      >
        <Typography variant="body1">feed</Typography>
      </Box>
      <Box
        className={classes.class_list}
        onClick={() => {
          navigate(`/${classid}/assignments`);
          dispatch(updateCurrentStage(AllStageType.CLASS));
        }}
        borderLeft={
          "/assignments" === currentPath
            ? "6px solid #41B094"
            : "0px solid #41B094"
        }
        bgcolor={
          "/assignments" === currentPath
            ? alpha(onClassColorTheme.green, 0.1)
            : "clear"
        }
      >
        <Typography variant="body1">assignments</Typography>
      </Box>
      <Box
        className={classes.class_list}
        onClick={() => navigate(`/${classid}/exam`)}
        borderLeft={
          "/exam" === currentPath ? "6px solid #41B094" : "0px solid #41B094"
        }
        bgcolor={
          "/exam" === currentPath
            ? alpha(onClassColorTheme.green, 0.1)
            : "clear"
        }
      >
        <Typography variant="body1">examination</Typography>
      </Box>
    </>
  );
};

export default NavClassMenu;
