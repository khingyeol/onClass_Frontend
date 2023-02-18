import { Box, Theme, Typography } from "@mui/material";
import React, { FC } from "react";
import PostBox from "../../components/Class/PostBox";
import FeedPost from "../../components/Class/FeedPost";
import { makeStyles } from "@mui/styles";
import { getClassDetail } from "../../store/classsdetail/selector";
import { useSelector } from "react-redux";
import { ClassFeedModel } from "../../services/types/getClassResponse";

const ClassFeed: FC = () => {
  const classes = useStyles();
  const classDetail = useSelector(getClassDetail);

  return (
    <>
      {/* Mobile Class Detail */}
      <Box className={classes.classCard}>
        <div className={classes.coverImg}>
          <Box position="absolute" padding="1.2em">
            <Typography variant="h2">{"Cyber Coding 2565"}</Typography>
            <Typography variant="description">{"B02"}</Typography>
          </Box>
        </div>
      </Box>
      <Box display="grid" gap={{ xs: "10px", sm: "30px" }}>
        {/* Re-render problem */}
        <PostBox />
        {classDetail?.class_feed &&
          classDetail?.class_feed.map((item: ClassFeedModel) => (
            <div key={item.data.id}>
              <FeedPost type={item.type} data={item.data} />
            </div>
          ))}
      </Box>
    </>
  );
};

export default ClassFeed;

const useStyles = makeStyles((theme: Theme) => ({
  classCard: {
    height: "127px",
    overflow: "hidden",
    borderBottomLeftRadius: "35px",
    borderBottomRightRadius: "35px",
    boxShadow: "0px 10px 19px rgba(0, 0, 0, 0.16)",
    marginBottom: "25px",
    cursor: "pointer",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  coverImg: {
    backgroundImage:
      "linear-gradient(to bottom, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0)), url('https://img.freepik.com/free-vector/christmas-holiday-golden-pattern-background-template-greeting-card-design_206636-74.jpg?size=626&ext=jpg')",
    objectFit: "cover",
    width: "100%",
    height: "100%",
  },
}));
