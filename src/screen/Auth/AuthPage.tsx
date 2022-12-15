import { Box, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { FC, useEffect, useState } from "react";
import AuthCard from "../../components/Auth/AuthCard";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const AuthPage: FC = () => {
  const classes = useStyles();
  const [showLogin, setShowLogin] = useState(true);

  const handleOnClick = () => {
    setShowLogin(!showLogin);
    console.log("tap", showLogin);
  };
  return (
    <Box className={classes.root}>
      <AuthCard
        type={showLogin ? "login" : "register"}
        onClick={handleOnClick}
      />
    </Box>
  );
};

export default AuthPage;
