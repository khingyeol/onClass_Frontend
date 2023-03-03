import { Box, Grid, Theme, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import { makeStyles } from "@mui/styles";
import { onClassColorTheme } from "../../common/theme/onClassColorTheme";
import OCTextField from "../../common/OCTextfield";
import OCButton from "../../common/OCButton";
import { CreateAssignmentRequest } from "../../services/types/postAssignmentCreate";
import { createAssigment } from "../../services/class/api_class";
import { displayDialog, hideDialog } from "../../store/dialog/action";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import OCChip from "../../common/OCChip";

const AssignmentCreate: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { classid } = useParams();
  const chipData = [{ label: "ได้", value: "YES" }, { label: "ไม่ได้", value: "NO" }];

  const [isAsmError, setIsAsmError] = useState({
    assignment_name: true,
    assignment_description: false,
  });
  const [content, setContent] = useState<CreateAssignmentRequest>({
    class_code: classid ?? "",
    data: {
      assignment_name: "",
      assignment_description: "",
      turnin_late: false,
      is_symbol_score: false,
      symbol_score: [],
      score: 0,
      assignment_optional_file: [],
      assignment_end_date: new Date().toISOString(),
    },
  });

  const handleAsmError = (errorName: string, flagError: boolean) => {
    setIsAsmError({
      ...isAsmError,
      [errorName]: flagError,
    });
  };

  const validateInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name === "score") {
      const valStr = e.target.value;
      const value = valStr.replace(/^0+/g, "");
      const regEx = /^[0-9]*$/;
      const regExTest = new RegExp(regEx);
      let scoreValue = 0;
      if (!regExTest.test(value)) {
        scoreValue = content.data.score;
      } else if (value === "") {
        scoreValue = 0;
      } else if (parseFloat(value) > 100) {
        scoreValue = 100
      }else {
        scoreValue = parseFloat(value);
      }
      setContent({
        ...content,
        data: {
          ...content.data,
          [e.target.name]: scoreValue,
        },
      });
      return false;
    }

    if (e.target.name === "assignment_end_date") {
      setContent({
        ...content,
        data: {
          ...content.data,
          [e.target.name]: new Date(e.target.value).toISOString(),
        }
      })
      return false;
    }

    if (
      e.target.name === "assignment_name" &&
      (e.target.value.length < 6 || e.target.value.length > 512)
    ) {
      handleAsmError("assignment_name", true);
    } else if (e.target.name === "assignment_name") {
      handleAsmError("assignment_name", false);
    }

    if (
      e.target.name === "assignment_description" &&
      e.target.value.length > 1024
    ) {
      handleAsmError("assignment_description", true);
    } else if (e.target.name === "assignment_description") {
      handleAsmError("assignment_description", false);
    }
    return true;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (validateInput(e)) {
      setContent({
        ...content,
        data: {
          ...content.data,
          [e.target.name]: e.target.value,
        },
      });
    }
  };

  const isDisabledCreateButton = () => {
    return isAsmError.assignment_name || isAsmError.assignment_description;
  };

  const onTappedCreate = async () => {
    console.log("MYLOG: create assignment", content);
    try {
      const res = await createAssigment(content!);
      if (res.status === 200 && res.data.result === "OK") {
        console.log("success create assignment");
        navigate(-1);
      } else {
        dispatch(
          displayDialog({
            id: "createAssignment",
            isShow: true,
            title: "Assignment",
            message: "Please enter all fields.",
            primaryLabel: "Close",
            onPrimaryAction: () => {
              dispatch(hideDialog());
            },
          })
        );
      }
    } catch (err: any) {
      dispatch(
        displayDialog({
          id: "createAssignment",
          isShow: true,
          title: "Assignment",
          message: err.response.data.result,
          primaryLabel: "Close",
          onPrimaryAction: () => {
            dispatch(hideDialog());
          },
        })
      );
    }
  };

  return (
    <>
      <Box className={classes.root}>
        <Typography variant="h3" borderBottom={1}>
          Create Assignment
        </Typography>
        <Box className={classes.row}>
          <Typography variant="h4">ชื่อ assignment :</Typography>
          <OCTextField
            variant="outline"
            maxWidth="300px"
            name="assignment_name"
            value={content.data.assignment_name}
            onChange={(e) => handleChange(e)}
            error={isAsmError.assignment_name}
          />
        </Box>

        <Grid container columnSpacing={1} rowSpacing="20px">
          <Grid item xs={12} lg={5} className={classes.row}>
            <Typography variant="h4">นักเรียนสามารถส่งช้า :</Typography>
            <OCChip data={chipData} />
          </Grid>

          <Grid item xs={12} lg={5} className={classes.row}>
            <Typography variant="h4">คะแนน :</Typography>
            <OCTextField
              variant="outline"
              maxWidth="100px"
              name="score"
              value={content.data.score}
              onChange={(e) => handleChange(e)}
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
            name="assignment_description"
            value={content.data.assignment_description}
            onChange={(e) => handleChange(e)}
            error={isAsmError.assignment_description}
          />
        </Box>

        <Box className={classes.row}>
          <Typography variant="h4">วัน-เวลาจบ :</Typography>
          <input
            type="datetime-local"
            id="assignment_end_date"
            name="assignment_end_date"
            onChange={(e) => handleChange(e)}
          />
        </Box>
        <Box className={classes.row}>
          <OCButton
            variant="outline"
            label="Cancel"
            onClick={() => navigate(-1)}
          />
          <OCButton
            label="Create"
            onClick={onTappedCreate}
            disabled={isDisabledCreateButton()}
          />
        </Box>
      </Box>
    </>
  );
};

export default AssignmentCreate;
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
