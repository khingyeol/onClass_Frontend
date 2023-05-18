import { Box, Theme, Typography, alpha, useMediaQuery } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import OCButton from "../../common/OCButton";
import { onClassColorTheme } from "../../common/theme/onClassColorTheme";
import AsmCard from "../../components/Home/AsmCard";
import { getClassDetail } from "../../store/classsdetail/selector";
import { formatDateTime, formatShortDate } from "../../utils/formatDate";
import { ReactComponent as AddButton2 } from "../../assets/svg/icon_plus.svg";
import { makeStyles } from "@mui/styles";
import {
  createExam,
  editExam,
  getAllExam,
  getExam,
} from "../../services/class/api_exam";
import { GetAllExamResponseData } from "../../services/types/getAllExamResponse";
import {
  ExamPartList,
  GetExamResponseData,
} from "../../services/types/getExamResponseData";
import { PostCreateExam } from "../../services/types/postCreateExam";
import OCTextField from "../../common/OCTextfield";
import TFGroup from "../../components/Class/TFGroup";

interface ExamCreateQuestionsProps {
  data: PostCreateExam;
}

const ExamCreateQuestions: FC<ExamCreateQuestionsProps> = (props) => {
  const classes = useStyles();
  const { data } = props;
  const navigate = useNavigate();

  const { classid, id } = useParams();
  // const [content, setContent] = useState<GetExamResponseData>();
  const [selected, setSelected] = useState(
    Array(data.exam.part_list[0].question).fill(0)
  );
  const [selectedSec, setSelectedSec] = useState(
    Array(data.exam.part_list[1].question).fill(0)
  );
  const [content, setContent] = useState<PostCreateExam>();
  const [quizObj, setQuizObj] = useState({
    question: "",
    choice: ["", "", "", ""],
    answer: [""],
    score: "",
  });
  const [quizSubj, setQuizSubj] = useState({
    question: "",
    score: "",
  });

  //   const fetchGetExam = async () => {
  //     try {
  //       const res = await getExam(classid!, id!);
  //       setContent(res.data.data);
  //     } catch (err) {
  //       console.log("[GetExam] ERROR", err);
  //     }
  //   };

  const handleChoice = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    part: number,
    index: number
  ) => {
    if (part === 0 && typeof content !== 'undefined') {
      console.log(quizObj)
      // setQuizObj({
      //   ...quizObj,
      //   choice: quizObj.choice.map((v, i) =>
      //     String(i) === e.target.name ? e.target.value : v
      //   ),
      //   answer: [quizObj.choice.at(selected[index]) ?? ""],
      // });
    } else {
      setQuizObj({
        ...quizObj,
        choice: quizObj.choice.map((v, i) =>
          String(i) === e.target.name ? e.target.value : v
        ),
        answer: [quizObj.choice.at(selectedSec[index]) ?? ""],
      });
    }
    data.exam.part_list[part].item?.splice(index, 1, quizObj);
    // console.log("answer", quizObj.choice.at(selected[index]), selected[index])
    console.log("ee", data.exam.part_list[part]);
  };

  const handleChangeObj = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    part: number,
    index: number
  ) => {
    if (part === 0) {
      setQuizObj({
        ...quizObj,
        question: e.target.value,
        score: String(data.exam.part_list[0].score),
        answer: [quizObj.choice.at(selected[index]) ?? ""],
      });
    } else {
      setQuizObj({
        ...quizObj,
        question: e.target.value,
        score: String(data.exam.part_list[1].score),
        answer: [quizObj.choice.at(selectedSec[index]) ?? ""],
      });
    }
    data.exam.part_list[part].item?.splice(index, 1, quizObj);
    // console.log("ee", data.exam.part_list[0]);
  };

  const handleChangeSubj = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    part: number,
    index: number
  ) => {
    setQuizSubj({
      ...quizSubj,
      [e.target.name]: e.target.value,
    });
    data.exam.part_list[part].item?.splice(index, 1, quizSubj);
  };

  const onSubmit = async () => {
    data.exam.part_list.map((part, index) =>
      part.item?.map((ques, i) => {
        if (index === 0) {
          console.log("index", index);
          ques.answer?.splice(0, 1, ques.choice?.at(selected[i]) ?? "");
        } else {
          console.log("index", index);
          ques.answer?.splice(1, 1, ques.choice?.at(selectedSec[i]) ?? "");
        }
      })
    );
    console.log("SUBMIT", data.exam.part_list);
    try {
      const res = await createExam(data);
      if (res.status === 200 && res.data.result === "OK") {
        //     console.log('SUCCESS', res)
        navigate(`/${classid}/exam`);
      }
      console.log("req", res);
    } catch (err: any) {
      //
    }
  };

  useEffect(() => {
    setContent(data);
    // data.exam!.part_list[0]!.item!.concat(...Array(5).fill(objItem))
    console.log("req 2", data);
  }, []);

  const mappedQuestion = (data: ExamPartList, part: number) => {
    switch (data.type) {
      case "objective": {
        return data.item?.map((obj: any, index: number) => (
          <div>
            <Typography>ข้อ {index + 1}</Typography>
            <OCTextField
              key={`que${part}${index}ee`}
              placeholder="คำถาม..."
              multiline
              name="question"
              onChange={(e) => handleChangeObj(e, part, index)}
            ></OCTextField>
            <Box display="flex" gap="17px">
              <TFGroup
                key={`obj${part}${index}0`}
                name="0"
                selected={part === 0 ? selected : selectedSec}
                onClick={part === 0 ? setSelected : setSelectedSec}
                onChange={(e) => handleChoice(e, part, index)}
                part={part}
                ques={index}
                index={0}
              />
              <TFGroup
                key={`obj${part}${index}1`}
                name="1"
                selected={part === 0 ? selected : selectedSec}
                onClick={part === 0 ? setSelected : setSelectedSec}
                onChange={(e) => handleChoice(e, part, index)}
                part={part}
                ques={index}
                index={1}
              />
              <TFGroup
                key={`obj${part}${index}2`}
                name="2"
                selected={part === 0 ? selected : selectedSec}
                onClick={part === 0 ? setSelected : setSelectedSec}
                onChange={(e) => handleChoice(e, part, index)}
                part={part}
                ques={index}
                index={2}
              />
              <TFGroup
                key={`obj${part}${index}3`}
                name="3"
                selected={part === 0 ? selected : selectedSec}
                onClick={part === 0 ? setSelected : setSelectedSec}
                onChange={(e) => handleChoice(e, part, index)}
                part={part}
                ques={index}
                index={3}
              />
            </Box>
          </div>
        ));
        // data.item
        // for (let i = 0; i <= 5; i++) {
        //     console.log ("Block statement execution no." + i);
        //     return (<Box>
        //         {data.question}
        //     </Box>)
        //   }
      }
      case "subjective": {
        return data.item?.map((obj: any, index: number) => (
          <div>
            <Typography>ข้อ {index + 1}</Typography>
            <Box display="flex" alignItems="center" gap="5px">
              <OCTextField
                key={`subj${part}${index}que`}
                placeholder="คำถาม..."
                multiline
                name="question"
                onChange={(e) => handleChangeSubj(e, part, index)}
              ></OCTextField>
              <Box width="150px">
                <OCTextField
                  key={`subj${part}${index}score`}
                  placeholder="คะแนน"
                  name="score"
                  onChange={(e) => handleChangeSubj(e, part, index)}
                ></OCTextField>
              </Box>
            </Box>
          </div>
        ));
      }
      default:
    }
  };

  return (
    <Box className={classes.postbox}>
      <Box className={classes.contents}>
        <Typography variant="h2">{data.exam.exam_name}</Typography>
        <Typography>{data.exam.exam_description}</Typography>
      </Box>
      {data.exam.part_list.map((obj: ExamPartList, part: number) => (
        <Box key={`choice${part}${obj.type}`}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h3">
              Part {part + 1}:{" "}
              {obj.type === "objective" ? "ปรนัย (ข้อกา)" : "อัตนัย (ข้อเขียน)"}
            </Typography>
            <Typography variant="h4">{obj.score} คะแนน</Typography>
          </Box>
          {mappedQuestion(obj, part)}
        </Box>
      ))}
      <OCButton label="Submit" onClick={onSubmit} />
    </Box>
  );
};

export default ExamCreateQuestions;

const useStyles = makeStyles((theme: Theme) => ({
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
  headline: {
    justifyContent: "flex-start",
    alignContent: "center",
    display: "flex",
    gap: "20px",
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      gap: "10px",
    },
  },
  contents: {
    fontSize: "16px",
    wordBreak: "break-word",
    whiteSpace: "pre-line",
    padding: "0.75rem 0",
    margin: "0.75rem 0 0 0",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
    },
  },
}));
