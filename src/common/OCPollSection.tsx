import { Theme, alpha, Box } from "@mui/material";
import { onClassColorTheme } from "./theme/onClassColorTheme";
import { PollModel, VoteAuthorModel } from "../services/types/ClassModel";
import React, { FC } from "react";
import { makeStyles } from "@mui/styles";

interface OCPollSectionProps {
  pollItems: PollModel[];
  voteAuthor: VoteAuthorModel | null;
  handleOnClickVote: (votedPoll: PollModel) => void;
}

const OCPollSection: FC<OCPollSectionProps> = (props) => {
  const classes = useStyles();
  const { pollItems, voteAuthor, handleOnClickVote } = props;

  const vote = (item: PollModel) => {
    handleOnClickVote({ choice_name: item.choice_name, vote: item.vote + 1 });
  };

  return <Box className={classes.pollSectionBox}></Box>;
};

export default OCPollSection;

const useStyles = makeStyles((theme: Theme) => ({
  pollSectionBox: {
    gap: "10px",
    justifyContent: "space-between",
    alignContent: "center",
    backgroundColor: onClassColorTheme.white,
    borderRadius: "35px",
    border: "1px solid",
    borderColor: alpha(onClassColorTheme.darkGrey, 0.3),
    padding: "20px 30px",
    display: "flex",
    flexDirection: "column",
    transition: "all 0.4s ease",
    [theme.breakpoints.down("md")]: {
      padding: "20px 15px",
    },
    [theme.breakpoints.down("sm")]: {
      cursor: "pointer",
      minHeight: "69px",
      padding: "0px 35px",
      borderRadius: "35px",
      color: onClassColorTheme.grey,
    },
  },
}));
