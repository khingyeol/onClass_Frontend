import { Box, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { FC, useEffect, useState } from "react";
import AuthCard from "../../components/Auth/AuthCard";
import backgroundImg from "../../assets/image/bg-auth.png";

const AuthPage: FC = () => {
  const classes = useStyles();
  const [showLogin, setShowLogin] = useState(true);

  const handleOnClick = () => {
    setShowLogin(!showLogin);
    console.log("tap", showLogin);
  };
  return (
    <Box className={classes.root}>
      <Box className={classes.box} />
      <AuthCard
        type={showLogin ? "login" : "register"}
        onClick={handleOnClick}
      />
    </Box>
  );
};

export default AuthPage;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    // flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F8FA",
    minHeight: "100%",
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    [theme.breakpoints.down("sm")]: {
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
  },
  box: {
    display: "block",
    width: "40%",
    [theme.breakpoints.down("lg")]: {
      display: "none",
    },
    [theme.breakpoints.up("xl")]: {
      width: "20%",
    },
  },
}));
