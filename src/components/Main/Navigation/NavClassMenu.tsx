import { alpha, Box, Theme, Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { onClassColorTheme } from "../../../common/theme/onClassColorTheme";
import { makeStyles } from "@mui/styles";

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
    // borderLeft: "6px solid #41B094",
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
  const classes = useStyles();
  const currentPath = window.location.pathname.substring(
    window.location.pathname.lastIndexOf("/")
  );
  const { classid } = useParams();

  // const menu = [
  //   {
  //     name: "feed",
  //     path: "/",
  //   },
  //   { name: "assignments", path: "/assignments" },
  //   { name: "examination", path: "/exam" },
  // ];

  return (
    <>
      {/* {menu.map((item: any) => (
        <Box
          key={item.name}
          className={classes.class_list}
          borderLeft={item.path === currentPath ? "6px solid #41B094" : "0px solid #41B094"}
        bgcolor={item.path === currentPath ? alpha(onClassColorTheme.green, 0.1) : "clear"}
          onClick={() => navigate(`${classid}/eiei`)}
        >
          <Typography variant="body1">{item.name}</Typography>
        </Box>
      ))} */}
      <Box
        className={classes.class_list}
        onClick={() => navigate(`/${classid}`)}
        borderLeft={("/" === currentPath) ? "6px solid #41B094" : "0px solid #41B094"}
        bgcolor={("/" === currentPath) ? alpha(onClassColorTheme.green, 0.1) : "clear"}
      >
        <Typography variant="body1">feed</Typography>
      </Box>
      <Box
        className={classes.class_list}
        onClick={() => navigate(`/${classid}/assignments`)}
        borderLeft={"/assignments" === currentPath ? "6px solid #41B094" : "0px solid #41B094"}
        bgcolor={"/assignments" === currentPath ? alpha(onClassColorTheme.green, 0.1) : "clear"}
      >
        <Typography variant="body1">assignments</Typography>
      </Box>
      <Box
        className={classes.class_list}
        onClick={() => navigate(`/${classid}/exam`)}
        borderLeft={"/exam" === currentPath ? "6px solid #41B094" : "0px solid #41B094"}
        bgcolor={"/exam" === currentPath ? alpha(onClassColorTheme.green, 0.1) : "clear"}
      >
        <Typography variant="body1">examination</Typography>
      </Box>

    </>
  );
};

export default NavClassMenu;
