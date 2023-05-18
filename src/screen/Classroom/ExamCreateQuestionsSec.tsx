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
    ExamChoiceItem,
  ExamPartList,
  GetExamResponseData,
} from "../../services/types/getExamResponseData";
import { PostCreateExam } from "../../services/types/postCreateExam";
import OCTextField from "../../common/OCTextfield";
import TFGroup from "../../components/Class/TFGroup";

interface ExamCreateQuestionsSecProps {
  data: PostCreateExam;
}

const ExamCreateQuestionsSec: FC<ExamCreateQuestionsSecProps> = (props) => {
  const classes = useStyles();
  const { data } = props;
  const navigate = useNavigate();

  const { classid, id } = useParams();
  const [quizObj, setQuizObj] = useState<ExamChoiceItem>({
    question: "",
    choice: ["", "", "", ""],
    answer: [""],
    score: "",
  });

  // const [content, setContent] = useState<GetExamResponseData>();
  const [selected, setSelected] = useState<any[][]>([[]]);
  //   const [selectedSec, setSelectedSec] = useState(
  //     Array(data.exam.part_list[1].question).fill(0)
  //   );
  const [content, setContent] = useState<PostCreateExam>();

  const handleChoice = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    part: number,
    index: number
  ) => {
    setQuizObj({
        ...data?.exam.part_list[part].item?.at(index),
        question: data?.exam.part_list[part].item?.at(index)?.question ?? '',
        choice: quizObj.choice!.map((v, i) => 
        String(i) === e.target.name ? e.target.value : v
        ),
        answer: [quizObj.choice!.at(selected[part][index]) ?? ""],
    })
    data.exam.part_list[part].item?.splice(index, 1, quizObj);
    console.log(data)
  }

  const handleChangeObj = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    part: number,
    index: number
  ) => {
    if (e.target.name === "question") {
        setQuizObj({
            ...data?.exam.part_list[part].item?.at(index),
            question: e.target.value,
        })
        data.exam.part_list[part].item?.splice(index, 1, quizObj);
        console.log(data)
    } 
    // var temp = {
    //     question: e.target.value,
    //     choice: content?.exam.part_list[0].item[index].choice ?? [""],
    //     answer: [""],
    //     score: "",    
    // }
    // data.exam.part_list[part].item?.splice(0, 1, {
    //     ...data.exam.part_list[part].item[index],
    //     question:  e.target.value
    // })
    // _.set(content, 'content.exam.part_list[part]!.item[index].question', e.target.value);
//     if (content && content.exam && content.exam.part_list[part] && content.exam.part_list[part]!.item) {
//         content!.exam!.part_list[part]!.item[index].question = e.target.value        
//   }
}

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
                selected={selected[part]}
                onClick={setSelected}
                onChange={(e) => handleChoice(e, part, index)}
                part={part}
                ques={index}
                index={0}
              />
              <TFGroup
                key={`obj${part}${index}1`}
                name="1"
                selected={selected[part]}
                onClick={setSelected}
                  onChange={(e) => handleChoice(e, part, index)}
                part={part}
                ques={index}
                index={1}
              />
              <TFGroup
                key={`obj${part}${index}2`}
                name="2"
                selected={selected[part]}
                onClick={setSelected}
                onChange={(e) => handleChoice(e, part, index)}
                part={part}
                ques={index}
                index={2}
              />
              <TFGroup
                key={`obj${part}${index}3`}
                name="3"
                selected={selected[part]}
                onClick={setSelected}
                onChange={(e) => handleChoice(e, part, index)}
                part={part}
                ques={index}
                index={3}
              />
            </Box>
          </div>
        ));
      }

      case "subjective": {
        return <>
        </>
      }
      default:
    }
  };
  
  const onSubmit = async () => {
    if (typeof content !== 'undefined') {
        content.exam.part_list.map((part, index) => 
            part.item?.map((ques, i) => {
                ques.answer?.splice(index, 1, ques.choice?.at(selected[index][i]) ?? "");
            })
        )
    }

    console.log("SUBMIT", data.exam.part_list);
    // try {
    //   const res = await createExam(data);
    //   if (res.status === 200 && res.data.result === "OK") {
    //     //     console.log('SUCCESS', res)
    //     navigate(`/${classid}/exam`);
    //   }
    //   console.log("req", res);
    // } catch (err: any) {
    //   //
    // }
}

  useEffect(() => {
    setContent(data);
    // if (content) {
    setSelected(
        Array.from(Array(data.exam.part_list.length), () => new Array(1))
        );      
    // }
  }, [data, data.exam.part_list.length, selected]);

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
export default ExamCreateQuestionsSec;

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
