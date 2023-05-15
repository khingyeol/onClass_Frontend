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
  const [isDisabledPartOne, setIsDisabledPartOne] = useState(true);
  const [isDisabledPartTwo, setIsDisabledPartTwo] = useState(true);

  const [partTwoScore, setPartTwoScore] = useState(0);
  const [partTwoQues, setPartTwoQues] = useState(0);

  const [reqBody, setReqBody] = useState<PostCreateExam>({
    class_code: classid ?? "",
    exam: {
      exam_name: "",
      exam_description: "",
      part_list: [],
      exam_start_date: "",
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
        if (reqBody.exam?.part_list[1]) {
          return (
            isNaN(reqBody.exam.part_list[1].question) ||
            isNaN(reqBody.exam.part_list[1].score) ||
            reqBody.exam.part_list[1].question === 0 ||
            reqBody.exam.part_list[1].score === 0
          );
        }
        return (
          isNaN(reqBody.exam.part_list[0].question) ||
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

    if (value !== "NO") {
      setIsDisabledPartTwo(false);
      reqBody.exam.part_list.push(temp);
    } else {
      setIsDisabledPartTwo(true);
      reqBody.exam.part_list.splice(1, 1);
    }
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
                  ...reqBody.exam.part_list[0],
                  score: parseInt(onlyNumber),
                },
              ],
            },
          });
        }
        break;
      }

      case "p2_ques": {
        const value = e.target.value;
        const onlyNumber = value.replace(/[^0-9]/g, "");
        setPartTwoQues(parseInt(onlyNumber));
        break;
      }

      case "p2_score": {
        const value = e.target.value;
        const onlyNumber = value.replace(/[^0-9]/g, "");
        setPartTwoScore(parseInt(onlyNumber));
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

  const onSubmit = async () => {
    const req: PostCreateExam = {
      ...reqBody,
      exam: {
        ...reqBody.exam,
        part_list: [
          {
            ...reqBody.exam.part_list[0],
            score:
              reqBody.exam.part_list[0].score /
              reqBody.exam.part_list[0].question,
          },
          reqBody.exam.part_list[1] && {
            ...reqBody.exam.part_list[1],
            question: partTwoQues,
            score: partTwoScore / partTwoQues,
          },
        ],
      },
    };

    if (!req.exam.part_list[1]) {
      console.log('slice')
      req.exam.part_list.splice(1,1)
    }

    try {
      const res = await createExam(req!);
      if (res.status === 200 && res.data.result === "OK") {
        // navigate -> create page
      }
      console.log("req", res);
    } catch (err: any) {
      //
    }
  };

  return (
    <>
      <Box className={classes.root}>
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
        </Grid>

        <Box className={classes.row}>
          <OCButton variant="outline" label="Cancel" />
          <OCButton
            label="Create"
            onClick={onSubmit}
            disabled={isDisabledCreateButton()}
          />
        </Box>
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
