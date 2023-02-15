import { Box, Theme, Typography } from "@mui/material";
import React, { FC } from "react";
import { makeStyles } from "@mui/styles";
import { onClassColorTheme } from "../../common/theme/onClassColorTheme";
import OCTextField from "../../common/OCTextfield";
import OCButton from "../../common/OCButton";

const AssignmentCreate: FC = () => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.root}>
        <Typography variant="h3" borderBottom={1}>
          Create Assignment
        </Typography>
        <Box className={classes.row}>
          <Typography variant="h4">ชื่อ assignment :</Typography>
          <OCTextField variant="outline" maxWidth="300px" />
        </Box>

<Box display={"inline"}>
        <Box className={classes.row}>
          <Typography variant="h4">นักเรียนสามารถส่งช้า :</Typography>
          **INSERT CHIPS**
        </Box>

        <Box className={classes.row}>
        <Typography variant="h4">คะแนน :</Typography>
          <OCTextField variant="outline" maxWidth="100px" />
          </Box></Box>

        <Box className={classes.row}>
          <Typography variant="h4">คำอธิบาย :</Typography>
          <OCTextField variant="outline" maxWidth="300px" multiline />
        </Box>

        <Box className={classes.row}>
          <Typography variant="h4">วัน-เวลาจบ :</Typography>
          <input
            type="datetime-local"
            id="assignment_end_date"
            onChange={() => {}}
          />
        </Box>
        <Box className={classes.row}>
          <OCButton variant="outline" label="Cancel" />
          <OCButton label="Create" />
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
