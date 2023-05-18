import {
  AppBar,
  Box,
  Container,
  Grid,
  Theme,
  Typography,
  alpha,
  useMediaQuery,
} from "@mui/material";
import React, { FC, memo, useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { onClassColorTheme } from "../../common/theme/onClassColorTheme";
import OCTextField from "../../common/OCTextfield";
import OCButton from "../../common/OCButton";
import OCChip from "../../common/OCChip";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { PostCreateExam } from "../../services/types/postCreateExam";
import { createExam, getExam } from "../../services/class/api_exam";
import ExamCreateQuestions from "./ExamCreateQuestions";
import { getClassDetail } from "../../store/classsdetail/selector";
import {
    ExamChoiceItem,
  ExamPartList,
  GetExamResponseData,
} from "../../services/types/getExamResponseData";
import { appBarHeightSm, appBarHeightXs } from "../../layout/HomeLayout";

const ExamContent: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const { classid, id } = useParams();
  const [content, setContent] = useState<GetExamResponseData>();
  const [resMesg, setResMesg] = useState("");
  const [timer, setTimer] = useState("19:00:00s");
//   const [stdAnswer, setStdAnswer] = useState(Array.from(Array(content?.part_list.length), content?.part_list.map((v, i) => new Array(v.item?.length))))
//   const [stdAnswer, setStdAnswer] = useState(Array.from(Array(content?.part_list.length), () => content?.part_list.map((v, i) => new Array(2))))

  const [stdAnswer, setStdAnswer] = useState(Array.from(Array(2), () =>  new Array(2)));

  const role = useSelector(getClassDetail).role;

  const fetchGetExam = async () => {
    try {
      const res = await getExam(classid!, id!);
      setResMesg(res.data.message);
      setContent(res.data.data);
    } catch (err) {
      console.log("[GetExam] ERROR", err);
    }
  };

  const mappedChip = (data: string[]) => {
    return data.map((obj) => {
        const temp = {
            label: obj
        }
        return temp
    })
  }

  const handleChipChange = (part: number, index: number, value: string) => {
    console.log(value);
    
    const temp = stdAnswer.map((row, i) => {
            row.map((choice, j) => {
                if (i === part && j === index) {
                    return value
                }
            })
        })

    // setStdAnswer((item) => {
    //       item.map((row, i) => {
    //          row.map((choice, j) => {
    //             if (i === part && j === index) {
    //                 console.log('')
    //                 return value
    //             }
    //         })
    //     })
    // })
    console.log(temp);

    // stdAnswer[part][index] = value

    // setContent({
    //   ...content,
    //   data: {
    //     ...content.data,
    //     "turnin_late": value === "YES" ? true : false,
    //   },
    // });
  }


  useEffect(() => {
    fetchGetExam();
    // stdAnswer[1][2] = "aee"
    // setStdAnswer({
    //     ...stdAnswer[0][0], "aee"
    // })
    console.log('stdAnswer', stdAnswer)
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        // style={{ , }}
        sx={{
          // zIndex: 1301,
          height: { xs: appBarHeightXs, sm: appBarHeightSm },
          boxShadow: "none",
          backgroundColor: onClassColorTheme.white,
          paddingTop: { xs: 2, sm: 4 },
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* TIMER */}
        <Typography variant="h1" color={onClassColorTheme.error}>
          {timer}
        </Typography>
      </AppBar>
      <Box marginTop={`${isDesktop ? appBarHeightSm : appBarHeightXs}px`}>
        {resMesg ? (
          // --- NOT IN THE TIME ---
          <Container
            maxWidth="lg"
            sx={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              alignItems: "center",
              paddingTop: "50px",
            }}
          >
            <Typography variant="h2">Hello, {role} !</Typography>
            <Typography variant="h1" color={onClassColorTheme.error}>
              {resMesg}
            </Typography>
            <Box style={{ width: "100px" }}>
              <OCButton
                label="back"
                onClick={() => navigate(`/${classid}/exam`)}
              ></OCButton>
            </Box>
          </Container>
        ) : (
          // --- IN THE TIME ---
          <Container maxWidth="lg">
            <Box className={classes.postbox}>
              {/* EXAM HEADER */}
              <Typography variant="title3">{content?.exam_name}</Typography>
              <Box className={classes.contents}>
                {content?.exam_description}
              </Box>

              {/* EXAM CONTENT */}
              {content?.part_list.map((obj: ExamPartList, part: number) => (
                <Box paddingY={2}>
                  <Typography variant="h3">
                    Part {part + 1}:{" "}
                    {obj.type === "objective"
                      ? "ปรนัย (ข้อกา)"
                      : "อัตนัย (ข้อเขียน)"}
                  </Typography>
                  {obj.item && obj.item.map((item: ExamChoiceItem, index: number) => (
                    <Box>
                        <Typography variant="title3">
                            {index+1}. {item.question}
                        </Typography>
                        <OCChip data={mappedChip(item.choice!)} selectedValue={stdAnswer[part][index]} handleOnSelect={(value) => handleChipChange(part, index, value)} />
                        {/* {item.choice && item.choice.ma} */}
                    </Box>
                  ))}
                </Box>
              ))}

              {/* EXAM SUBMIT */}
            </Box>
          </Container>
        )}
      </Box>
    </>
  );
};
export default memo(ExamContent);

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // backgroundColor: onClassColorTheme.error
  },
  navBox: {
    display: "flex",
  },
  postbox: {
    gap: "10px",
    backgroundColor: onClassColorTheme.white,
    borderRadius: "35px",
    border: "1px solid ",
    borderColor: alpha(onClassColorTheme.darkGrey, 0.3),
    padding: "20px 30px",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      padding: "13px 18px",
      borderRadius: "28px",
      borderColor: alpha(onClassColorTheme.darkGrey, 0.2),
    },
  },
  contents: {
    fontSize: "17px",
    wordBreak: "break-word",
    whiteSpace: "pre-line",
    padding: "0.75rem 0",
    margin: "0.75rem 0 0 0",
    borderTop: "1px solid ",
    borderBottom: "1px solid ",
    borderColor: alpha(onClassColorTheme.darkGrey, 0.3),
    [theme.breakpoints.down("sm")]: {
      fontSize: "15px",
      borderColor: alpha(onClassColorTheme.darkGrey, 0.2),
    },
  },
}));
