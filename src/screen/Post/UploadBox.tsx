import { Box, Button, Theme, Typography, useMediaQuery } from "@mui/material";
import React, { FC, useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import { onClassColorTheme } from "../../common/theme/onClassColorTheme";
import { makeStyles } from "@mui/styles";
import OCButton from "../../common/OCButton";
import { assignmentGet } from "../../services/class/api_class";
import { AssignmentModel } from "../../services/types/ClassModel";
import { async } from "q";
import { response } from "express";
import { uploadFile } from "../../services/class/api_file";

const UploadBox: FC = () => {
  const classes = useStyles();
  const { classid, id } = useParams();
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const [asmContent, setAsmContent] = useState<AssignmentModel>();
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState("nOK");

  const fetchGetPost = async () => {
    await assignmentGet(classid!, id!)
      .then((response) => {
        if (response.data.result === "OK") setAsmContent(response.data.data);
      })
      .catch((error) => {
        // setError(true);
      });
  };

  // const filePreview = files.map((file, index) => (
  //     <Box key={index}>
  //         <Typography className={classes.filename}>{file}</Typography>
  //     </Box>
  // ))

  const onInputUpload = (e: any) => {
    setFiles(e.target.value);
    console.log(e);
    // console.log(e);
  };

  const onSubmit = async () => {
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("file", files[i]);
    }
    console.log(files);
    // const res = await uploadFile(data)
    // if (res.data.result === 'OK') {
    //     console.log(res)
    //     setStatus(res.data.result)
    // } else {
    //     console.log(res)
    // }
  };

  // const onSuccessUpload = useCallback( async (savedFiles,status) => {
  //     // setFiles(savedFiles)
  //     // console.log('3 saved',savedFiles)
  //     // console.log('4 status',status)
  //     const fileName_arr = []
  //     const fileId_arr = []
  //     if (status == 'OK') {
  //         if(savedFiles.length > 0) {
  //             for (let i = 0; i < savedFiles[0].file_name.length ; i++) {
  //                 fileName_arr.push(savedFiles[0].file_name[i])
  //                 fileId_arr.push(savedFiles[0].id[i])
  //             }
  //         }
  //         const reqBody = {
  //             class_code: inputs.class_code,
  //             assignment_id: inputs.assignment_id,
  //             data: {
  //                 file_result: fileId_arr,
  //                 answer: ''
  //             }
  //         }
  //         const res = await assignmentStdSubmit(reqBody);
  //         if(res.data.result == 'OK') {
  //             window.location.reload()
  //         }
  //         else {
  //             console.log('submit error');
  //         }
  //     }

  //     setFiles(fileName_arr)
  //     //เรียก api ส่งการบ้าน โยน data
  //     //เอา onsuccess ไปทำไาสักอย่างเพื่อที่จะ show componentปุ่ม/refresh
  //     // ส่งค่า submit กลับไป ถ้า onsuccess กลับมาแล้วเปลี่ยนค่าเปน unsubmit + disable upload
  // }, []);

  useEffect(() => {
    fetchGetPost();
  }, []);

  return (
    <>
      {asmContent && (
        <Box className={classes.box}>
          <Box className={classes.content}>
            <Box className={classes.title}>
              <Typography variant="h4">Due date:</Typography>
              <Typography variant="h4" color={onClassColorTheme.green}>
                Due date:
              </Typography>
            </Box>
            {/* <Box width="100%" > */}
            {asmContent?.can_submit && (
              <>
                <Button variant="contained" component="label">
                  Upload File
                  <input type="file" onChange={onInputUpload} multiple hidden />
                </Button>
                <OCButton
                  label={"Submit"}
                  onClick={onSubmit}
                  height="36px"
                  cornerRadius="10px"
                />
                {/* <OCButton variant='outline' label={'Unsubmit'} height="36px" cornerRadius="10px" /> */}
              </>
            )}
            {/* {files.length ? <>
                    files.map((file, index) => {
         
            <Box key={index}>
                <Typography className={classes.filename}>{file}</Typography>
            </Box>
        
    })
                    </> : null} */}
            {
              // files.length ? filePreview : null
            }
            {/* <Box className={classes.dropZone}>
                        Choose file
                        <input
                            type="file"
                            hidden
                        />
                    </Box> */}
            {/* {!asmContent?.can_submit && } */}

            {/* </Box> */}
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
  },
  filename: {
    backgroundColor: "#F6F8FA",
    borderRadius: "10px",
    padding: "8px 12px",
  },
}));
