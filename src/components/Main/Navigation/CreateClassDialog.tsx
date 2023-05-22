import {
  Box,
  Button,
  Dialog,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { FC, useState } from "react";
import { alpha, Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { CreateClassRequest } from "../../../services/types/postClassCreateRequest";
import { createClass } from "../../../services/class/api_class";
import OCTextField from "../../../common/OCTextfield";
import OCButton from "../../../common/OCButton";
import { displayDialog, hideDialog } from "../../../store/dialog/action";
import { useDispatch } from "react-redux";

interface CreateClassDialogProps {
  open: boolean;
  onClose: () => void;
}
const CreateClassDialog: FC<CreateClassDialogProps> = (props) => {
  const { open, onClose } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [content, setContent] = useState<CreateClassRequest>({
    class_name: "",
    class_description: "",
    class_section: "",
    class_room: "",
    class_subject: "",
    class_thumbnail: "61a604dcf456d7f2cb754fa7",
    firstname: "",
    lastname: "",
    optional_name: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContent({
      ...content,
      [e.target.name]: e.target.value,
    });
  };

  const onTappedCreate = async () => {
    console.log("!!!!!!!", content);
    const res = await createClass(content!);
    if (res.status === 200) {
      window.location.reload();
      console.log("success join class");
    } else if (res.status === 404) {
      dispatch(
        displayDialog({
          id: "onTappedCreateClass",
          isShow: true,
          title: "Create Class",
          message: res.data.message,
          primaryLabel: "Close",
          onPrimaryAction: () => {
            dispatch(hideDialog());
          },
        })
      );    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        className: classes.dialogCreate,
        style: {
          borderRadius: "35px",
        },
      }}
    >
      <Box padding="20px">
        <Box sx={{ borderBottom: 1, padding: 1 }}>
          <Typography variant="h3">Create Class</Typography>
        </Box>
        <Box paddingY={2} display="flex" flexDirection="column" gap={2}>
          <OCTextField
            name="class_name"
            value={content?.class_name}
            onChange={(e) => handleChange(e)}
            label="Class Name* :"
          />
          <OCTextField
            name="class_subject"
            value={content?.class_subject}
            onChange={(e) => handleChange(e)}
            label="Class Subject :"
          />
          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            gap={{ xs: "12px", sm: "17px" }}
          >
            <OCTextField
              name="class_section"
              value={content.class_section}
              onChange={(e) => handleChange(e)}
              label={"Class Section :"}
            />
            <OCTextField
              name="class_room"
              value={content.class_room}
              onChange={(e) => handleChange(e)}
              label={"Class Room :"}
            />
          </Box>
          <OCTextField
            name="class_description"
            value={content?.class_description}
            onChange={(e) => handleChange(e)}
            label="Class Description :"
          />
          <Box />
          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            gap={{ xs: "12px", sm: "17px" }}
          >
            <OCTextField
              name="firstname"
              value={content.firstname}
              onChange={(e) => handleChange(e)}
              label={"Firstname* :"}
            />
            <OCTextField
              name="lastname"
              value={content.lastname}
              onChange={(e) => handleChange(e)}
              label={"Lastname* :"}
            />
          </Box>
          <OCTextField
            name="optional_name"
            value={content.optional_name}
            onChange={(e) => handleChange(e)}
            label="Nickname (Optional) :"
          />
          <Box
            display="flex"
            justifyContent="flex-end"
            sx={{ borderTop: 1, padding: 1 }}
          >
            <OCButton label="CLOSE" variant="outline" onClick={onClose} />
            <OCButton label="CREATE" onClick={onTappedCreate} />
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default CreateClassDialog;

const useStyles = makeStyles((theme: Theme) => ({
  dialogCreate: {
    // borderRadius: "50px",
    width: "100%",
    height: "auto",
  },
}));
