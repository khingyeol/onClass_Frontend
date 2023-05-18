import { Box, Grid, Theme, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import { makeStyles } from "@mui/styles";
import { onClassColorTheme } from "../../common/theme/onClassColorTheme";
import OCTextField from "../../common/OCTextfield";
import OCButton from "../../common/OCButton";
import OCChip from "../../common/OCChip";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { PostCreateExam } from "../../services/types/postCreateExam";
import { createExam } from "../../services/class/api_exam";
import ExamCreateQuestions from "./ExamCreateQuestions";
import ExamCreateQuestionsSec from "./ExamCreateQuestionsSec";

const ExamCreate: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { classid } = useParams();
  const chipDataOne = [
    { label: "ข้อกา", value: "objective" },
    { label: "ข้อเขียน", value: "subjective" },
  ];
  const chipDataTwo = [
    { label: "ไม่มี", value: "NO" },
    { label: "ข้อกา", value: "objective" },
    { label: "ข้อเขียน", value: "subjective" },
  ];
  const randomQuestionChipData = [
    { label: "สุ่ม", value: "YES" },
    { label: "ไม่สุ่ม", value: "NO" },
  ];
  const randomChoiceChipData = [
    { label: "สุ่ม", value: "YES" },
    { label: "ไม่สุ่ม", value: "NO" },
  ];
  const [selectedChipTwo, setSelectedChipTwo] = useState("");
  const [isDisabledPartOne, setIsDisabledPartOne] = useState(true);
  const [isDisabledPartTwo, setIsDisabledPartTwo] = useState(true);

  const [partTwoScore, setPartTwoScore] = useState(0);
  const [partTwoQues, setPartTwoQues] = useState(0);

  const [examStep, setExamStep] = useState(1);
  const [reqBody, setReqBody] = useState<PostCreateExam>({
    class_code: classid ?? "",
    exam: {
      exam_name: "",
      exam_description: "",
      part_list: [],
      exam_start_date: "",
      optional_setting: {
        random_question: false,
        random_choice: false,
      },
      exam_end_date: "",
    },
  });

  const isDisabledCreateButton = () => {
    if (
      reqBody.exam.exam_name.length > 1 &&
      reqBody.exam.exam_description.length > 1 &&
      reqBody.exam.exam_start_date.length > 1 &&
      reqBody.exam.exam_end_date.length > 1
    ) {
      if (reqBody.exam?.part_list[0]) {
        // if (reqBody.exam?.part_list[1]) {
        //   return (
        //     isNaN(reqBody.exam.part_list[1].question) ||
        //     isNaN(reqBody.exam.part_list[1].score) ||
        //     reqBody.exam.part_list[1].question === 0 ||
        //     reqBody.exam.part_list[1].score === 0
        //   );
        // }
        return (
          isNaN(reqBody.exam.part_list[0].question!) ||
          isNaN(reqBody.exam.part_list[0].score) ||
          reqBody.exam.part_list[0].question === 0 ||
          reqBody.exam.part_list[0].score === 0
        );
      }
      return true;
    }
    return true;
  };

  const handleChipOne = (value: string) => {
    setIsDisabledPartOne(false);
    const temp = {
      part_id: "1",
      type: value,
      question: 0,
      score: 0,
    };
    reqBody.exam.part_list[0] = temp;
  };

  const handleChipTwo = (value: string) => {
    const temp = {
      type: value,
      question: 0,
      score: 0,
    };
    setSelectedChipTwo(value);
    if (value !== "NO") {
      setIsDisabledPartTwo(false);
      // reqBody.exam.part_list.push(temp);
    } else {
      setIsDisabledPartTwo(true);
      // reqBody.exam.part_list.splice(1, 1);
    }
    console.log(reqBody.exam.part_list);
  };

  const onChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;

    switch (name) {
      case "p1_ques": {
        const value = e.target.value;
        const onlyNumber = value.replace(/[^0-9]/g, "");
        if (reqBody.exam.part_list[0]) {
          setReqBody({
            ...reqBody,
            exam: {
              ...reqBody.exam,
              part_list: [
                {
                  ...reqBody.exam.part_list[0],
                  question: parseInt(onlyNumber),
                },
              ],
            },
          });
        }
        break;
      }

      case "p1_score": {
        const value = e.target.value;
        const onlyNumber = value.replace(/[^0-9]/g, "");
        if (reqBody.exam.part_list[0]) {
          setReqBody({
            ...reqBody,
            exam: {
              ...reqBody.exam,
              part_list: [
                {
                  // ...reqBody.exam.part_list,
                  ...reqBody.exam.part_list[0],
                  score: parseInt(onlyNumber),
                },
              ],
            },
          });
        }
        console.log(reqBody.exam.part_list);
        break;
      }

      case "p2_ques": {
        const value = e.target.value;
        const onlyNumber = value.replace(/[^0-9]/g, "");
        setPartTwoQues(parseInt(onlyNumber));
        // if (reqBody.exam.part_list[1]) {
        //   setReqBody({
        //     ...reqBody,
        //     exam: {
        //       ...reqBody.exam,
        //       part_list: [
        //         {
        //           ...reqBody.exam.part_list[1],
        //           question: parseInt(onlyNumber),
        //         },
        //       ],
        //     },
        //   });
        // }
        console.log(reqBody.exam.part_list);
        break;
      }

      case "p2_score": {
        const value = e.target.value;
        const onlyNumber = value.replace(/[^0-9]/g, "");
        setPartTwoScore(parseInt(onlyNumber));
        // if (reqBody.exam.part_list[1]) {
        //   // reqBody.exam.part_list[1].score = v
        //   // setReqBody({})
        //   setReqBody({
        //     ...reqBody,
        //     exam: {
        //       ...reqBody.exam,
        //       part_list: reqBody.exam.part_list.map((v, i) =>
        //         i === 1 ? {...v, score: parseInt(onlyNumber)} : v
        //       ),
        //     },
        //   });
        // }
        console.log(reqBody.exam?.part_list[1]!);
        console.log(reqBody.exam.part_list);
        break;
      }
      default: {
        setReqBody({
          ...reqBody,
          exam: {
            ...reqBody.exam,
            [name]: e.target.value,
          },
        });
        break;
      }
    }
  };

  const mappedArr = (index: number) => {
    const objItem = {
      question: "",
      type: "",
      choice: [""],
    };
    const subjItem = {
      question: "",
      type: "",
    };
    console.log("reqbody mapped", reqBody.exam?.part_list[index]);
    if (reqBody.exam?.part_list[index]) {
      if (reqBody.exam?.part_list[index].type === "objective") {
        reqBody.exam!.part_list[index]!.item = new Array(
          reqBody.exam!.part_list[index]!.question
        ).fill(objItem);
      } else {
        reqBody.exam!.part_list[index]!.item = new Array(
          reqBody.exam!.part_list[index]!.question
        ).fill(subjItem);
      }
    }
  };

  const onSubmit = async () => {
    if (selectedChipTwo !== "NO") {
      reqBody.exam.part_list.push({
        part_id: "2",
        type: selectedChipTwo,
        question: partTwoQues,
        score: partTwoScore,
      });
    } else {
      reqBody.exam.part_list.splice(1, 1);
    }

    // setReqBody({
    //   ...reqBody,
    //   exam: {
    //     ...reqBody.exam,
    //     part_list: [
    //       {
    //         ...reqBody.exam.part_list[0],
    //         score:
    //           reqBody.exam.part_list[0].score /
    //           reqBody.exam.part_list[0].question!,
    //       },
    //       reqBody.exam.part_list[1] && {
    //         ...reqBody.exam.part_list[1],
    //         question: partTwoQues,
    //         score: partTwoScore / partTwoQues,
    //       },
    //     ],
    //   },
    // });

    // if (!finalReq.exam.part_list[1]) {
    //   console.log("slice");
    //   finalReq.exam.part_list.splice(1, 1);
    // }

    mappedArr(0);
    if (reqBody.exam.part_list[1]) {
      console.log("mapped");
      mappedArr(1);
    }
    setExamStep(2);

    console.log("req", reqBody);
    // try {
    //   const res = await createExam(reqBody!);
    //   if (res.status === 200 && res.data.result === "OK") {
    //     // setExamStep(2);
    //     // navigate -> create page
    //   }
    //   console.log("req", res);
    // } catch (err: any) {
    //   //
    // }
  };

  const handleRandomQuestionChipChange = (value: string) => {
    setReqBody({
      ...reqBody,
      exam: {
        ...reqBody.exam,
        optional_setting: 
          {
            ...reqBody.exam.optional_setting,
            "random_question": value === "YES" ? true : false,
          },
        
      },
    });
  };

  const handleRandomChoiceChipChange = (value: string) => {
    setReqBody({
      ...reqBody,
      exam: {
        ...reqBody.exam,
        optional_setting: 
          {
            ...reqBody.exam.optional_setting,
            "random_choice": value === "YES" ? true : false,
          },
        
      },
    });
  };

  return (
    <>
      <Box className={classes.root}>
        {examStep === 1 ? (
          <>
            <Typography variant="h3" borderBottom={1}>
              Create Exam
            </Typography>
            <Box className={classes.row}>
              <Typography variant="h4">ชื่อการสอบ :</Typography>
              <OCTextField
                variant="outline"
                maxWidth="300px"
                name="exam_name"
                onChange={(e) => onChangeInput(e)}
              />
            </Box>
            <Grid container columnSpacing={1} rowSpacing="10px">
              <Grid item xs={12} lg={6} className={classes.row}>
                <Typography variant="h4">Part 1:</Typography>
                <OCChip data={chipDataOne} handleOnSelect={handleChipOne} />
              </Grid>

              <Grid item xs={12} lg={3} className={classes.row}>
                <Typography variant="body1">จำนวนข้อ :</Typography>
                <OCTextField
                  variant="outline"
                  maxWidth="100px"
                  name="p1_ques"
                  value={reqBody.exam?.part_list[0]?.question}
                  onChange={(e) => onChangeInput(e)}
                  disabled={isDisabledPartOne}
                  inputProps={{ inputMode: "numeric" }}
                />
              </Grid>

              <Grid item xs={12} lg={3} className={classes.row}>
                <Typography variant="body1">คะแนนรวม :</Typography>
                <OCTextField
                  variant="outline"
                  maxWidth="100px"
                  name="p1_score"
                  value={reqBody.exam?.part_list[0]?.score}
                  onChange={(e) => onChangeInput(e)}
                  disabled={isDisabledPartOne}
                  inputProps={{ inputMode: "numeric" }}
                />
              </Grid>
            </Grid>
            <Grid container columnSpacing={1} rowSpacing="10px">
              <Grid item xs={12} lg={6} className={classes.row}>
                <Typography variant="h4">Part 2:</Typography>
                <OCChip data={chipDataTwo} handleOnSelect={handleChipTwo} />
              </Grid>

              <Grid item xs={12} lg={3} className={classes.row}>
                <Typography variant="body1">จำนวนข้อ :</Typography>
                <OCTextField
                  variant="outline"
                  maxWidth="100px"
                  name="p2_ques"
                  // value={reqBody.exam?.part_list[1]?.question}
                  value={partTwoQues}
                  onChange={(e) => onChangeInput(e)}
                  disabled={isDisabledPartTwo}
                  inputProps={{ inputMode: "numeric" }}
                />
              </Grid>

              <Grid item xs={12} lg={3} className={classes.row}>
                <Typography variant="body1">คะแนนรวม :</Typography>
                <OCTextField
                  variant="outline"
                  maxWidth="100px"
                  name="p2_score"
                  // value={reqBody.exam?.part_list[1]?.score}
                  value={partTwoScore}
                  onChange={(e) => onChangeInput(e)}
                  disabled={isDisabledPartTwo}
                  inputProps={{ inputMode: "numeric" }}
                />
              </Grid>
            </Grid>
            <Box className={classes.row}>
              <Typography variant="h4">คำอธิบาย :</Typography>
              <OCTextField
                variant="outline"
                maxWidth="300px"
                multiline
                name="exam_description"
                onChange={(e) => onChangeInput(e)}
              />
            </Box>
            <Grid container columnSpacing={1} rowSpacing="20px">
              <Grid item xs={12} lg={5} className={classes.row}>
                <Typography variant="h4">วัน-เวลาเริ่มสอบ :</Typography>
                <input
                  type="datetime-local"
                  name="exam_start_date"
                  onChange={(e) => onChangeInput(e)}
                />
              </Grid>

              <Grid item xs={12} lg={5} className={classes.row}>
                <Typography variant="h4">วัน-เวลาจบ :</Typography>
                <input
                  type="datetime-local"
                  name="exam_end_date"
                  onChange={(e) => onChangeInput(e)}
                />
              </Grid>
              <Grid item xs={12} lg={12} className={classes.row}>
                <Typography variant="h4">สุ่มคำถาม :</Typography>
                <OCChip
                  data={randomQuestionChipData}
                  selectedValue={"NO"}
                  handleOnSelect={handleRandomQuestionChipChange}
                />
              </Grid>
              <Grid item xs={12} lg={12} className={classes.row}>
                <Typography variant="h4">สุ่มตัวเลือก :</Typography>
                <OCChip
                  data={randomChoiceChipData}
                  selectedValue={"NO"}
                  handleOnSelect={handleRandomChoiceChipChange}
                />
              </Grid>
            </Grid>
            <Box className={classes.row}>
              <OCButton
                variant="outline"
                label="Cancel"
                onClick={() => navigate(`/${classid}/exam`)}
              />
              <OCButton
                label="Create"
                onClick={onSubmit}
                disabled={isDisabledCreateButton()}
              />
            </Box>
          </>
        ) : examStep === 2 ? (
          // <ExamCreateQuestionsSec data={reqBody} />
          <ExamCreateQuestions data={reqBody} />
        ) : null}
      </Box>
    </>
  );
};

export default ExamCreate;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: onClassColorTheme.white,
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
}));
