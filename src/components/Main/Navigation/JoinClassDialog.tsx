import { Box, Dialog, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { joinClass } from "../../../services/class/api_class";
import OCTextField from "../../../common/OCTextfield";
import OCTextfield from "../../../common/OCTextfield";
import { onClassColorTheme } from "../../../common/theme/onClassColorTheme";
import OCButton from "../../../common/OCButton";
import { JoinClassRequest } from "../../../services/types/patchClassJoinRequest";

interface JoinClassDialogProps {
  open: boolean;
  onClose: () => void;
}

const JoinClassDialog: FC<JoinClassDialogProps> = (props) => {
  const { open, onClose } = props;
  const classes = useStyles();
  const [content, setContent] = useState<JoinClassRequest>({
    class_code: "",
    firstname: "",
    lastname: "",
  });
  const [errMsg, setErrMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContent({
      ...content,
      [e.target.name]: e.target.value,
    });
  };

  const onTappedJoin = async () => {
    console.log("!!!!!!!", content);
    const res = await joinClass(content!);
    if (res.status === 200) {
      window.location.reload();
      console.log("success join class");
    } else if (res.status === 404) {
      setErrMsg("Class Code Not Found !");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        className: classes.dialogJoin,
        style: {
          borderRadius: "35px",
        },
      }}
    >
      <Box padding="20px">
        <Box sx={{ borderBottom: 1, padding: 1 }}>
          <Typography variant="h3">Join Class</Typography>
        </Box>
        <Box paddingY={2} display="flex" flexDirection="column" gap={2}>
          <Box width="50%">
            <Typography variant="body1">Enter Class Code :</Typography>
            <OCTextField
              name="class_code"
              value={content?.class_code}
              onChange={(e) => handleChange(e)}
              error={errMsg.length > 1}
              helperText={errMsg}
            />
            {errMsg.length > 1 && <Typography>{errMsg}</Typography>}
          </Box>
          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            gap={{ xs: "12px", sm: "17px" }}
          >
            <OCTextfield
              name="firstname"
              value={content.firstname}
              onChange={(e) => handleChange(e)}
              label={"Firstname"}
            />
            <OCTextfield
              name="lastname"
              value={content.lastname}
              onChange={(e) => handleChange(e)}
              label={"Lastname"}
            />
          </Box>
          <Box display="flex" width="70%">
            <Typography color={onClassColorTheme.grey}>
              nickname (Optional)
            </Typography>
            <OCTextfield
              name="optional_name"
              value={content.optional_name}
              onChange={(e) => handleChange(e)}
              //   sx={{width: "50%"}}
            />
          </Box>
          <Box
            display="flex"
            justifyContent="flex-end"
            sx={{ borderTop: 1, padding: 1 }}
          >
            <OCButton label="CLOSE" variant="outline" onClick={onClose} />
            <OCButton label="JOIN" onClick={onTappedJoin} />
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default JoinClassDialog;

const useStyles = makeStyles((theme: Theme) => ({
  dialogJoin: {
    // borderRadius: "50px",
    width: "100%",
    // height: "50%",
  },
}));
