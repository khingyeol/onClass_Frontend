import React, {
  useState,
  useEffect,
  useRef,
  createRef,
  RefObject,
} from "react";
import styles from "./MultiplePoll.module.css";
import { Typography } from "@mui/material";
import { onClassColorTheme } from "../theme/onClassColorTheme";
import { manageVote, countPercentage, animateAnswers } from "./utils";
//import { manageVote } from './utils'
import type { Result } from "./types/result";
import type { Theme } from "./types/theme";

interface MultiplePollProps {
  question?: string;
  results: Result[];
  theme?: Theme;
  isVoted?: boolean;
  isVotedId?: number;
  onVote?(item: Result, results: Result[]): void;
}

const MultiplePoll = ({
  question,
  results,
  theme,
  onVote,
  isVoted,
  isVotedId,
}: MultiplePollProps) => {
  const [voted, setVoted] = useState<boolean>(false);
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);
  const [isClickable, setIsClickable] = useState<boolean>(false);
  const answerRefs = useRef<RefObject<HTMLDivElement>[]>(
    results.map(() => createRef<HTMLDivElement>())
  );

  useEffect(() => {
    if (isVoted) {
      countPercentage(results);
      if (isFirstRender) {
        console.log("MYLOG: render");
        animateAnswers(results, answerRefs, theme, isVotedId);
      }
      setIsFirstRender(false);
      setTimeout(() => {
        setVoted(true);
      }, 4000);
    } else {
      setTimeout(() => {
        setIsClickable(true);
      }, 4000);
    }
  }, [results, answerRefs]);

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
              setVoted(true);
              manageVote(results, result, answerRefs, theme);
              onVote?.(result, results);
            }
          }}
        >
          <div
            ref={answerRefs.current[result.id]}
            className={styles.answerInner}
          >
            <Typography
              fontSize="18px"
              fontFamily="FC-Subject"
              fontWeight="regular"
              color={onClassColorTheme.black}
              width={100}
            >
              {result.text}
            </Typography>
          </div>
          {voted && (
            <span style={{ color: theme?.textColor }}>
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
