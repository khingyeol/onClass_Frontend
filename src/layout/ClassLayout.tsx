import { Box, useMediaQuery } from "@mui/material";
import React, { FC, memo, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import ClassDetail from "../components/Class/ClassDetail";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import HomeNavigation from "./Navigation";
import { appBarHeightSm, appBarHeightXs } from "./HomeLayout";
import { getfromClass } from "../services/class/api_class";
import {
  updateClassDetail,
  updateClassFeed,
} from "../store/classsdetail/action";
import { useDispatch, useSelector } from "react-redux";
import { getClassDetail } from "../store/classsdetail/selector";
import { GetClassResponseData } from "../services/types/getClassResponse";
import { gql, useQuery, useSubscription } from "@apollo/client";

const FEEDS_QUERY = gql`
  query FeedsQuery($classCode: String!) {
    feeds(class_code: $classCode) {
      type
      data
    }
  }
`;

const FEEDS_SUBSCRIPTION = gql`
  subscription NewFeedUpdate($classCode: String!) {
    feeds(class_code: $classCode) {
      type
      data
    }
  }
`;

const ClassLayout: FC = (props) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { classid } = useParams();
  const classDetail = useSelector(getClassDetail);
  const {
    loading: loadingQ,
    data: dataQ,
  } = useQuery(FEEDS_QUERY, {
    variables: { classCode: classid },
  });
  const subscriptionClassFeed = useSubscription(
    FEEDS_SUBSCRIPTION,
    {
      variables: { classCode: classid },
      onData: ({ data }) => {
        if (!data.loading) dispatch(updateClassFeed(data.data.feeds));
      }
    }
  );

  const fetchGetFromClass = async (id: string) => {
    try {
      const res = await getfromClass(id);
      const data: GetClassResponseData = res.data.data;
      dispatch(updateClassDetail(data));
    } catch (err: any) {
      navigate("/home");
    }
  };

  useEffect(() => {
    if (classid) {
      fetchGetFromClass(classid);
      console.log('q', classDetail?.teacher[0]?.optional_contact && classDetail?.teacher[0]?.optional_contact?.length > 1);
    }
  }, []);

  useEffect(() => {
    if (classid && !loadingQ && dataQ) {
      dispatch(updateClassFeed(dataQ.feeds));
    }
  }, [loadingQ])


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
        {isDesktop ? <ClassDetail classDetail={classDetail} /> : null}
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
