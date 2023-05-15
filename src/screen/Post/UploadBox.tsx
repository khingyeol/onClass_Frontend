import {
  alpha,
  Box,
  Button,
  Dialog,
  Grid,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { FC, useState, useEffect, useCallback, useMemo } from "react";
import { useParams } from "react-router";
import { onClassColorTheme } from "../../common/theme/onClassColorTheme";
import { makeStyles } from "@mui/styles";
import OCButton from "../../common/OCButton";
import {
  assignmentGet,
  assignmentStdSubmit,
} from "../../services/class/api_class";
import { AssignmentModel } from "../../services/types/ClassModel";
import { async } from "q";
import { response } from "express";
import { uploadFile } from "../../services/class/api_file";
import OCTextField from "../../common/OCTextfield";
import { AssignmentStdSubmit } from "../../services/types/patchAssignmentStdSubmit";
import { formatShortDate } from "../../utils/formatDate";
import Dropzone, { useDropzone } from "react-dropzone";
import OCIconButton from "../../common/OCIconButton";
import CloseIcon from "../../assets/svg/icon_close.svg";
import FileIcon from "../../assets/svg/icon_clip.svg";
import TextIcon from "../../assets/svg/icon_text.svg";
import UrlIcon from "../../assets/svg/icon_text.svg";
import { Link } from "react-router-dom";

const UploadBox: FC = () => {
  const classes = useStyles();
  const { classid, id } = useParams();
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const [asmContent, setAsmContent] = useState<AssignmentModel>();
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [status, setStatus] = useState("nOK");
  const [answerResult, setAnswerResult] = useState("");
  const [urlResult, setUrlResult] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState("");

  const fetchGetPost = async () => {
    await assignmentGet(classid!, id!)
      .then((response) => {
        if (response.data.result === "OK") setAsmContent(response.data.data);
      })
      .catch((error) => {
        // setError(true);
      });
  };

  const Preview: FC<{ name: string; type: "file" | "text" | "url" }> = (
    props
  ) => {
    const { name, type } = props;
    return (
      <>
        <Box key={name} className={classes.filename}>
          <div style={{ display: "inline" }}>
            <img
              alt="file"
              src={
                type === "file"
                  ? FileIcon
                  : type === "text"
                    ? TextIcon
                    : type === "url"
                      ? UrlIcon
                      : UrlIcon
              }
              style={{
                width: "13px",
                opacity: "0.5",
              }}
            />{" "}
          </div>
          <div style={{ display: "inline", whiteSpace: "break-spaces" }}>
            {name}
          </div>
          {/* <OCIconButton
        icon={CloseIcon}
        color={onClassColorTheme.grey}
        size={"15px"}
        onClick={() => newFileList.splice(index, 1)}
      /> */}
        </Box>
      </>
    );
  };

  const handleClickDialog = (type: string) => {
    setOpenDialog(!openDialog);
    setDialogType(type);
  };

  const renderRightTitle = () => {
    if (!asmContent?.already_submit && asmContent?.can_submit) {
      return formatShortDate(asmContent?.assignment_end_date);
    } else {
      return asmContent?.status;
    }
  };

  const renderFilename = (files?: any[], text?: string, url?: string) => {
    return (
      <>
        {files &&
          files.map((file, index) => (
            <a href={file.file_path} download={file.file_name} style={{ textDecoration: 'none', color: 'black' }}>
              <Preview name={file.name ?? file.file_name} type={"file"} />
            </a>
          ))}
        {!openDialog && text && <Preview name={text} type="text" />}
        {!openDialog && url && <Preview name={url} type="text" />}
      </>
    );
  };

  const onChangeAnswer = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    switch (dialogType) {
      case "url":
        return setUrlResult(e.target.value);
      case "text":
        return setAnswerResult(e.target.value);
    }
  };

  const isDisabledBtn = () => {
    if (answerResult !== "" || urlResult !== "" || acceptedFiles.length > 0) {
      return false;
    }
    return true;
  };

  const onSubmit = async () => {
    const fileIdArr = [];

    if (acceptedFiles.length > 0) {
      const uploadData = new FormData();
      for (let i = 0; i < acceptedFiles.length; i++) {
        uploadData.append("file", acceptedFiles[i]);
      }
      const uploadResponse = await uploadFile(uploadData);

      if (uploadResponse.data.result === "OK") {
        const fileUpload = uploadResponse.data.data[0];
        for (let i = 0; i < fileUpload.file_name.length; i++) {
          // fileName_arr.push(fileUpload.file_name[i])
          fileIdArr.push(fileUpload.id[i]);
        }
      }
    }

    const reqBody: AssignmentStdSubmit = {
      class_code: classid!,
      assignment_id: id!,
      data: {
        file_result: fileIdArr ?? [],
        answer_result: answerResult ?? "",
        url_result: urlResult ?? "",
      },
    };
    const res = await assignmentStdSubmit(reqBody);
    if (res.data.result === "OK") {
      window.location.reload();
    } else {
      console.log("submit error");
    }
  };

  useEffect(() => {
    fetchGetPost();
  }, []);

  return (
    <>
      <Dialog
        className={classes.root}
        open={openDialog}
        onClose={handleClickDialog}
      // PaperProps={{
      //   style: {
      //     borderRadius: "28px",
      //     width: "100%",
      //     height: "50%",
      //   },
      // }}
      >
        {dialogType === "text" ? (
          <Box className={classes.dialog}>
            <Typography variant="h4">Add Text</Typography>
            <OCTextField
              name="answer_result"
              value={answerResult}
              onChange={(e) => onChangeAnswer(e)}
              placeholder={"Answer Result"}
            />
            <OCButton
              label={"Submit"}
              onClick={() => handleClickDialog("text")}
            />
          </Box>
        ) : (
          <Box className={classes.dialog}>
            <Typography variant="h4">Add Url</Typography>
            <OCTextField
              name="url_result"
              value={urlResult}
              onChange={(e) => onChangeAnswer(e)}
              placeholder={"Url Result"}
            />
            <OCButton
              label={"Submit"}
              onClick={() => handleClickDialog("url")}
            />
          </Box>
        )}
      </Dialog>
      {asmContent && (
        <Box className={classes.box}>
          <Box className={classes.content}>
            <Box className={classes.title}>
              <Typography variant="h4">Due date:</Typography>
              <Typography variant="h4" color={onClassColorTheme.green}>
                {renderRightTitle()}
              </Typography>
            </Box>
            {/* <Box width="100%" > */}
            {(!asmContent?.already_submit && asmContent?.can_submit) ? (
              <>
                {/* <FileNamePreview acceptedFiles={acceptedFiles} /> */}
                {/* {mapFile()} */}
                {renderFilename(acceptedFiles, answerResult, urlResult)}
                <Box
                  {...getRootProps({ className: "dropZone" })}
                  sx={{
                    cursor: "pointer",
                    backgroundColor: "#F6F8FA",
                    borderRadius: "10px",
                    fontWeight: "bold",
                    color: alpha("#41B094", 0.4),
                    alignContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    paddingY: "20px",
                  }}
                >
                  <input {...getInputProps()} />
                  Choose a file or drag it here
                </Box>
                <Box display="flex" gap="10px">
                  <OCButton
                    fullWidth
                    variant="outline"
                    label={"Add Text"}
                    onClick={() => handleClickDialog("text")}
                    height="36px"
                    cornerRadius="10px"
                  />
                  <OCButton
                    fullWidth
                    variant="outline"
                    label={"Add Url"}
                    onClick={() => handleClickDialog("url")}
                    height="36px"
                    cornerRadius="10px"
                  />
                </Box>
                <OCButton
                  label={"Submit"}
                  onClick={onSubmit}
                  height="36px"
                  cornerRadius="10px"
                  disabled={isDisabledBtn()}
                />
              </>
            ) : (
              <>
                {renderFilename(
                  asmContent?.submit_result?.file_result,
                  asmContent?.submit_result?.answer_result,
                  asmContent?.submit_result?.url_result
                )}
                {asmContent?.can_submit && (
                  <OCButton
                    variant="outline"
                    label={"Unsubmit"}
                    onClick={() =>
                      setAsmContent({
                        ...asmContent,
                        already_submit: false,
                      })
                    }
                    height="36px"
                    cornerRadius="10px"
                  // disabled={isDisabledBtn()}
                  />
                )}
              </>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};
export default UploadBox;

const useStyles = makeStyles((theme: Theme) => ({
  box: {
    // display: "inline-block",
    boxShadow: "0px 10px 19px rgba(0, 0, 0, 0.16)",
    borderRadius: "35px",
    overflow: "hidden",
    width: "340px",
    height: "100%",
    backgroundColor: onClassColorTheme.white,
    margin: "0px 50px 0px 10px",
    transition: "all 0.4s ease",
    [theme.breakpoints.down("lg")]: {
      width: "306px",
      margin: "0px 15px 0px 10px",
    },
  },
  content: {
    padding: "25px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    // objectFit: "none",
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
  },
  dropZone: {
    backgroundColor: "#F6F8FA",
    borderRadius: "10px",
  },
  filename: {
    fontSize: "14px",
    backgroundColor: "#F6F8FA",
    borderRadius: "10px",
    padding: "8px 12px",
  },
  root: {
    "& .MuiPaper-root": {
      borderRadius: "35px",
      width: "80%",
      boxShadow: "0px 10px 19px rgba(0, 0, 0, 0.16)",
      backgroundColor: "white",
      [theme.breakpoints.down("sm")]: {
        borderRadius: "25px",
        padding: "0 20px",
        margin: "10px 40px",
        height: "auto",
      },
    },
    justifyContent: "center",
  },
  dialog: {
    padding: "40px",
    // width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // justifyItems: "center",
    gap: "30px",
    [theme.breakpoints.down("sm")]: {
      padding: "20px",
      gap: "20px",
    },
  },
}));
