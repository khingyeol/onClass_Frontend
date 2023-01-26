import { alpha, Box, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { onClassColorTheme } from "../../../common/theme/onClassColorTheme";

interface NavListProps {
  title: string;
  icon: any;
  children?: any;
  path: string;
}

const NavList: FC<NavListProps> = (props) => {
  const { title, icon, children, path } = props;
  const classes = useStyles();
  const navigate = useNavigate();
  const isActive = window.location.pathname === path;

  return (
    <Box width="100%">
      <Box
        className={classes.nav_list}
        boxSizing={isActive ? "border-box" : "unset"}
        onClick={() => navigate(path)}
      >
        <img className={classes.img_navlist} alt={title} src={icon} />
        <Typography variant="h3">{title}</Typography>
      </Box>
      {children}
    </Box>
  );
};

export default NavList;

const useStyles = makeStyles((theme: Theme) => ({
  nav_list: {
    width: "100%",
    height: "65px",
    paddingLeft: "40px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    cursor: "pointer",
    borderRight: "6px solid #41B094",
    // borderRight: "10px solid #41B094",
    "&:hover": {
      backgroundColor: alpha(onClassColorTheme.green, 0.1),
      // boxShadow: "inset -5px 0 0px 0px #41B094",
      borderRight: "6px solid #41B094",
      // boxSizing: "border-box",
      width: "100%",
      "& img": {
        transform: "scale(1.05)",
        paddingRight: "calc(5%+10px)",
      },
    },
    [theme.breakpoints.down("sm")]: {
      gap: "12px",
      height: "58px",
    },
  },
  img_navlist: {
    width: "36px",
    height: "36px",
    [theme.breakpoints.down("sm")]: {
      width: "32.4px",
      height: "32.4px",
    },
  },
}));
