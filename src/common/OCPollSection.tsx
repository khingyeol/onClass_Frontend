import { Theme, alpha, Box } from "@mui/material";
import { onClassColorTheme } from "./theme/onClassColorTheme";
import { PollModel, VoteAuthorModel } from "../services/types/ClassModel";
import React, { FC } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import { MultiplePoll } from "./MultiplePoll/MultiplePoll";
import { getUserData } from "../store/userdata/selector";
// import { Result } from "./MultiplePoll/types/result";

interface OCPollSectionProps {
  pollItems: PollModel[];
  voteAuthor: VoteAuthorModel[];
  handleOnClickVote: (votedPoll: PollModel) => void;
}

const OCPollSection: FC<OCPollSectionProps> = (props) => {
  const classes = useStyles();
  const { pollItems, voteAuthor, handleOnClickVote } = props;
  const userData = useSelector(getUserData);

  // const resultData = () => {
  //   return pollItems.map((item, index) => {
  //     return { id: index, text: item.choice_name, votes: item.vote, percentage: item.percentage};
  //   });
  // };

  const customTheme = {
    mainColor: `${onClassColorTheme.green}`,
    backgroundColor: `${onClassColorTheme.white}`,
    alignment: "center",
  };

  const vote = (item: PollModel) => {
    handleOnClickVote({ choice_name: item.choice_name, vote: item.vote + 1 });
  };

  const isVoted = () => {
    const data = {
      isVoted: false,
      isVotedId: -1,
    };

    for (let i = 0; i < voteAuthor.length; i++) {
      if (voteAuthor[i].username === userData.username) {
        data.isVoted = true;
        data.isVotedId = voteAuthor[i].vote;
      }
    }
    return data;
  };

  return (
    <Box className={classes.pollSectionBox}>
      <MultiplePoll
        results={pollItems}
        theme={customTheme}
        isVoted={isVoted().isVoted}
        isVotedId={isVoted().isVoted ? isVoted().isVotedId : undefined}
        onVote={vote}
      />
    </Box>
  );
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
