import { Box, useMediaQuery } from "@mui/material";
import { FC, memo, useEffect, useMemo } from "react";
import { useParams } from "react-router";
import { makeStyles } from "@mui/styles";
import { alpha, Theme, useTheme } from "@mui/material/styles";
import ClassDetail from "../components/Class/ClassDetail";
import { Outlet, Route, Routes } from "react-router-dom";
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
      <div>
        PostLayout
      </div>
    )
    // const 
  }