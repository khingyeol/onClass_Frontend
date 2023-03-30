import { Box, Grid, Theme, Typography } from "@mui/material";
import React, { FC } from "react";
import { makeStyles } from "@mui/styles";
import { onClassColorTheme } from "../../common/theme/onClassColorTheme";
import OCTextField from "../../common/OCTextfield";
import OCButton from "../../common/OCButton";
import OCChip from "../../common/OCChip";

const ExamCreate: FC = () => {
  const classes = useStyles();
  const chipDataOne = [{ label: "ข้อกา", value: "YES" }, { label: "ข้อเขียน", value: "NO" }];
  const chipDataTwo = [{ label: "ไม่มี", value: "NONE" }, { label: "ข้อกา", value: "YES" }, { label: "ข้อเขียน", value: "NO" }];

  return (
    <>
      <Box className={classes.root}>
        <Typography variant="h3" borderBottom={1}>
          Create Exam
        </Typography>
        <Box className={classes.row}>
          <Typography variant="h4">ชื่อการสอบ :</Typography>
          <OCTextField variant="outline" maxWidth="300px" />
        </Box>

        <Grid container columnSpacing={1} rowSpacing="10px">
          <Grid item xs={12} lg={6} className={classes.row}>
            <Typography variant="h4">Part 1:</Typography>
            <OCChip data={chipDataOne} />
          </Grid>

          <Grid item xs={12} lg={3} className={classes.row}>
            <Typography variant="body1">จำนวนข้อ :</Typography>
            <OCTextField variant="outline" maxWidth="100px" />
          </Grid>

          <Grid item xs={12} lg={3} className={classes.row}>
            <Typography variant="body1">คะแนนรวม :</Typography>
            <OCTextField variant="outline" maxWidth="100px" />
          </Grid>
        </Grid>

        <Grid container columnSpacing={1} rowSpacing="10px">
          <Grid item xs={12} lg={6} className={classes.row}>
            <Typography variant="h4">Part 2:</Typography>
            <OCChip data={chipDataTwo} />
          </Grid>

          <Grid item xs={12} lg={3} className={classes.row}>
            <Typography variant="body1">จำนวนข้อ :</Typography>
            <OCTextField variant="outline" maxWidth="100px" />
          </Grid>

          <Grid item xs={12} lg={3} className={classes.row}>
            <Typography variant="body1">คะแนนรวม :</Typography>
            <OCTextField variant="outline" maxWidth="100px" />
          </Grid>
        </Grid>

        <Box className={classes.row}>
          <Typography variant="h4">คำอธิบาย :</Typography>
          <OCTextField variant="outline" maxWidth="300px" multiline />
        </Box>

        <Grid container columnSpacing={1} rowSpacing="20px">
          <Grid item xs={12} lg={5} className={classes.row}>
          <Typography variant="h4">วัน-เวลาเริ่มสอบ :</Typography>
          <input
            type="datetime-local"
            id="assignment_start_date"
            onChange={() => {}}
          />
          </Grid>

          <Grid item xs={12} lg={5} className={classes.row}>
          <Typography variant="h4">วัน-เวลาจบ :</Typography>
          <input
            type="datetime-local"
            id="assignment_end_date"
            onChange={() => {}}
          />
          </Grid>
        </Grid>

        <Box className={classes.row}>
          <OCButton variant="outline" label="Cancel" />
          <OCButton label="Create" />
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
