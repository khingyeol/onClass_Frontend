import React, {
  useState,
  useEffect,
  useRef,
  createRef,
  RefObject,
  useCallback,
} from "react";
import styles from "./MultiplePoll.module.css";
import { Typography } from "@mui/material";
import { onClassColorTheme } from "../theme/onClassColorTheme";
import { animateAnswers } from "./utils";
// import { manageVote, countPercentage, animateAnswers } from "./utils";
// import type { Result } from "./types/result";
import type { Theme } from "./types/theme";
import { PollModel } from "../../services/types/ClassModel";

interface MultiplePollProps {
  question?: string;
  results: PollModel[];
  theme?: Theme;
  isPostAuthor?: boolean;
  isVoted?: boolean;
  isVotedId?: number;
  onVote?(item: PollModel, results: PollModel[]): void;
}

const MultiplePoll = ({
  question,
  results,
  theme,
  isPostAuthor,
  onVote,
  isVoted,
  isVotedId,
}: MultiplePollProps) => {
  const [voted, setVoted] = useState<boolean>(false);
  const [isClickable, setIsClickable] = useState<boolean>(false);
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);
  const [previous, setPrevious] = useState<PollModel[]>([]);
  const answerRefs = useRef<RefObject<HTMLDivElement>[]>(
    results.map(() => createRef<HTMLDivElement>())
  );

  const arraysEqual = (a1: any[], a2: any[]) =>
    a1.length === a2.length &&
    a1.every(
      (o: any, idx: any) => JSON.stringify(o) === JSON.stringify(a2[idx])
    );

  const reAnimateAnswers = (current: PollModel[]) => {
    if (previous.length === 0) {
      setPrevious(current);
    } else if (!arraysEqual(previous, current)) {
      animateAnswers(results, answerRefs, theme, isVotedId);
      setPrevious(current);
    }
  };

  useEffect(() => {
    if (previous.length !== 0) {
      reAnimateAnswers(results);
    }
  }, [results]);

  useEffect(() => {
    if (isVoted || isPostAuthor) {
      //   countPercentage(results);
      if (isFirstRender) {
        animateAnswers(results, answerRefs, theme, isVotedId);
        reAnimateAnswers(results);
      }
      setIsFirstRender(false);
      setVoted(true);
      //   setTimeout(() => {
      //     setVoted(true);
      //   }, 4000);
    } else {
      setTimeout(() => {
        setIsClickable(true);
      }, 500);
    }
  }, [isVoted]);

  return (
    <article
      className={styles.container}
      style={{ alignItems: theme?.alignment }}
    >
      {question && <h1 style={{ color: theme?.textColor }}>{question}</h1>}

      {results.map((result) => (
        <div
          key={result.id}
          role="button"
          id={"mulAnswer" + result.id}
          className={
            voted ? styles.answer : styles.answer_hover + " " + styles.answer
          }
          style={{
            backgroundColor: theme?.backgroundColor,
          }}
          onClick={() => {
            if (!voted && !isVoted && isClickable) {
              //   setVoted(true);
              //   manageVote(results, result, answerRefs, theme);
              onVote?.(result, results);
            }
          }}
        >
          <div
            ref={answerRefs.current[result.id!]}
            className={styles.answerInner}
          >
            <Typography
              fontSize="18px"
              fontFamily="FC-Subject"
              fontWeight="regular"
              color={onClassColorTheme.black}
              width={100}
            >
              {result.choice_name}
            </Typography>
          </div>
          {(voted || isPostAuthor) && (
            <span style={{ color: theme?.textColor, fontSize: "15px" }}>
              {result.percentage}%
            </span>
          )}
        </div>
      ))}
    </article>
  );
};

export { MultiplePoll };
export type { MultiplePollProps };
