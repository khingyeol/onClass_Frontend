import { Box, Grid, Theme, Typography, alpha } from "@mui/material";
import React, { FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import { onClassColorTheme } from "../../common/theme/onClassColorTheme";
import OCTextField from "../../common/OCTextfield";
import OCButton from "../../common/OCButton";
import OCDropDown from "../../common/OCDropDown";
import {
  editClassDetail,
  editClassRole,
  getfromClass,
  leaveClass,
  setClassNickname,
} from "../../services/class/api_class";
import { displayDialog, hideDialog } from "../../store/dialog/action";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUserData } from "../../store/userdata/selector";
import { getClassDetail } from "../../store/classsdetail/selector";
import { JoinClassRequest } from "../../services/types/patchClassJoinRequest";
import { updateClassDetail } from "../../store/classsdetail/action";
import { GetClassResponseData } from "../../services/types/getClassResponse";
import { ClassEditDetailsRequest } from "../../services/types/patchClassEditDetails";
import OCChip from "../../common/OCChip";
import { current } from "@reduxjs/toolkit";

const ClassSetting: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { classid } = useParams();
  const userData = useSelector(getUserData);
  const classData = useSelector(getClassDetail);
  const [role, setRole] = useState("student");

  const [classContent, setClassContent] = useState<ClassEditDetailsRequest>({
    class_name: classData.class_name,
    class_description: classData.class_description,
    class_section: classData.class_section,
    class_room: classData.class_room,
    class_subject: classData.class_subject,
  });

  const [content, setContent] = useState<JoinClassRequest>({
    class_code: classid ?? "",
    firstname: "",
    lastname: "",
    optional_name: "",
  });

  const [selectedDropdown, setSelectedDropdown] = useState<string>("");
  const chipData = [
    { label: "teacher", value: "teacher" },
    { label: "student", value: "student" },
  ];

  useEffect(() => {
    classData.teacher.map((val, index) => {
      if (val.user_id === userData.user_id) {
        setRole("teacher");
        return;
      }
    });
    classData.nickname.map((val, index) => {
      if (val.user_id === userData.user_id) {
        setContent({
          ...content,
          firstname: val.firstname,
          lastname: val.lastname,
          optional_name: val.optional_name,
        });
        return;
      }
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContent({
      ...content,
      [e.target.name]: e.target.value,
    });
  };

  const handleClassDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setClassContent({
      ...classContent,
      [e.target.name]: e.target.value,
    });
  };

  const onTappedLeave = async () => {
    const res = await leaveClass({ class_code: classid ?? "" });
    if (res.status === 200) {
      if (res.data.result === "OK") {
        window.location.reload();
      } else {
        dispatch(
          displayDialog({
            id: "leaveClass",
            isShow: true,
            title: "Class",
            message: "You cannot leave class as teacher.",
            primaryLabel: "Close",
            onPrimaryAction: () => {
              dispatch(hideDialog());
            },
          })
        );
      }
    }
  };

  const isDisabledSaveButton = () => {
    return (
      content.firstname.length === 0 ||
      content.firstname.length > 32 ||
      content.lastname.length === 0 ||
      content.lastname.length > 32 ||
      content.optional_name!.length > 32
    );
  };

  const fetchGetFromClass = async (id: string) => {
    try {
      const res = await getfromClass(id);
      const data: GetClassResponseData = res.data.data;
      dispatch(updateClassDetail(data));
      navigate(-1);
    } catch (err: any) {
      navigate("/home");
    }
  };

  const onTappedSave = async () => {
    try {
      const res = await setClassNickname(content!);
      if (res.status === 200 && res.data.result === "OK") {
        fetchGetFromClass(classid!);
      } else {
        dispatch(
          displayDialog({
            id: "classNickname",
            isShow: true,
            title: "Class",
            message: res.data.message,
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
          id: "classNickname",
          isShow: true,
          title: "Class",
          message: err.response.data.result,
          primaryLabel: "Close",
          onPrimaryAction: () => {
            dispatch(hideDialog());
          },
        })
      );
    }
  };

  const isDisabledSaveClassButton = () => {
    return (
      classContent.class_name.length < 6 ||
      classContent.class_name.length > 512 ||
      classContent.class_description.length > 1024 ||
      classContent.class_section.length > 512 ||
      classContent.class_room.length > 512 ||
      classContent.class_subject.length > 512
    );
  };

  const roleUpdaterArr = () => {
    const arr: string[] = [];
    classData.teacher.map((val) => {
      return arr.push(`${val.name.firstname} ${val.name.lastname}`);
    });

    classData.student.map((val) => {
      return arr.push(`${val.name.firstname} ${val.name.lastname}`);
    });
    return arr;
  };

  const [previousRole, setPreviousRole] = useState<string>("");
  const [currentRole, setCurrentRole] = useState<string>("");
  const [currentRoleUserId, setCurrentRoleUserId] = useState<string>("");

  const roleUpdaterValue = () => {
    classData.teacher.map((val) => {
      if (selectedDropdown === `${val.name.firstname} ${val.name.lastname}`) {
        setCurrentRoleUserId(val.user_id);
        setCurrentRole("teacher");
        setPreviousRole("teacher");
      }
    });

    classData.student.map((val) => {
      if (selectedDropdown === `${val.name.firstname} ${val.name.lastname}`) {
        setCurrentRoleUserId(val.user_id);
        setCurrentRole("student");
        setPreviousRole("student");
      }
    });
  };

  useEffect(() => {
    roleUpdaterValue();
  }, [selectedDropdown]);

  const handleChipChange = (value: string) => {
    setCurrentRole(value);
  };

  const onTappedUpdateRole = async () => {
    try {
      const res = await editClassRole({
        class_code: classid ?? "",
        data: { user_id: currentRoleUserId, role: currentRole },
      });
      if (res.status === 200 && res.data.result === "OK") {
        fetchGetFromClass(classid!);
      } else {
        dispatch(
          displayDialog({
            id: "classEditRoles",
            isShow: true,
            title: "Class",
            message: res.data.message,
            primaryLabel: "Close",
            onPrimaryAction: () => {
              dispatch(hideDialog());
            },
          })
        );
      }
    } catch (err: any) {
      if (err.response.status === 403) {
        dispatch(
            displayDialog({
              id: "classEditRoles",
              isShow: true,
              title: "Class",
              message: "You must have at least one teacher in a class.",
              primaryLabel: "Close",
              onPrimaryAction: () => {
                dispatch(hideDialog());
              },
            })
          );
      } else {
        dispatch(
            displayDialog({
              id: "classEditRoles",
              isShow: true,
              title: "Class",
              message: err.response.data.result,
              primaryLabel: "Close",
              onPrimaryAction: () => {
                dispatch(hideDialog());
              },
            })
          );
      }
    }
  };

  const onTappedSaveClass = async () => {
    try {
      const res = await editClassDetail(classid ?? "", classContent);
      if (res.status === 200 && res.data.result === "OK") {
        fetchGetFromClass(classid!);
      } else {
        dispatch(
          displayDialog({
            id: "classDetail",
            isShow: true,
            title: "Class",
            message: res.data.message,
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
          id: "classDetail",
          isShow: true,
          title: "Class",
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
        {role === "teacher" && (
          <>
            <Grid
              container
              columnSpacing={1}
              rowSpacing="20px"
              borderBottom={1}
              alignItems={"center"}
            >
              <Grid item xs={12} lg={12}>
                <Typography variant="h3">Class Setting</Typography>
              </Grid>
            </Grid>
            <Grid container columnSpacing={1} rowSpacing="20px">
              <Grid item xs={12} lg={6} className={classes.row}>
                <Typography variant="h4">Classname :</Typography>
                <OCTextField
                  variant="outline"
                  maxWidth="200px"
                  name="class_name"
                  value={classContent.class_name}
                  onChange={(e) => handleClassDetailsChange(e)}
                />
              </Grid>

              <Grid item xs={12} lg={5} className={classes.row}>
                <Typography variant="h4">Section :</Typography>
                <OCTextField
                  variant="outline"
                  maxWidth="100px"
                  name="class_section"
                  value={classContent.class_section}
                  onChange={(e) => handleClassDetailsChange(e)}
                />
              </Grid>
            </Grid>
            <Grid container columnSpacing={1} rowSpacing="20px">
              <Grid item xs={12} lg={6} className={classes.row}>
                <Typography variant="h4">Subject :</Typography>
                <OCTextField
                  variant="outline"
                  maxWidth="200px"
                  name="class_subject"
                  value={classContent.class_subject}
                  onChange={(e) => handleClassDetailsChange(e)}
                />
              </Grid>

              <Grid item xs={12} lg={5} className={classes.row}>
                <Typography variant="h4">Room :</Typography>
                <OCTextField
                  variant="outline"
                  maxWidth="100px"
                  name="class_room"
                  value={classContent.class_room}
                  onChange={(e) => handleClassDetailsChange(e)}
                />
              </Grid>
            </Grid>
            <Box className={classes.row}>
              <Typography variant="h4">Description :</Typography>
              <OCTextField
                variant="outline"
                maxWidth="200px"
                name="class_description"
                value={classContent.class_description}
                onChange={(e) => handleClassDetailsChange(e)}
              />
            </Box>
            <Box className={classes.row}>
              <OCButton
                variant="outline"
                label="Save Class"
                onClick={onTappedSaveClass}
                disabled={isDisabledSaveClassButton()}
              />
            </Box>
            <Grid
              container
              columnSpacing={1}
              rowSpacing="20px"
              borderBottom={1}
              alignItems={"center"}
            >
              <Grid item xs={12} lg={12}>
                <Typography variant="h3">Role Setting</Typography>
              </Grid>
            </Grid>
            <Grid container columnSpacing={1} rowSpacing="20px">
              <Grid item xs={12} lg={7} className={classes.row}>
                <OCDropDown
                  label=""
                  items={roleUpdaterArr()}
                  placeholder="กรุณาเลือกชื่อ"
                  handleChange={(e) => {
                    setSelectedDropdown(e.target.value as string);
                  }}
                  value={selectedDropdown}
                />
              </Grid>
              <Grid item xs={12} lg={5} className={classes.row}>
                <OCChip
                  data={chipData}
                  selectedValue={currentRole}
                  handleOnSelect={handleChipChange}
                />
              </Grid>
              <Grid item xs={12} lg={12} className={classes.row}>
                <OCButton
                  variant="primary"
                  label="Update"
                  onClick={onTappedUpdateRole}
                  disabled={currentRole === "" || currentRole === previousRole}
                />
              </Grid>
            </Grid>
          </>
        )}
        <Grid
          container
          columnSpacing={1}
          rowSpacing="20px"
          borderBottom={1}
          alignItems={"center"}
        >
          <Grid item xs={12} lg={10}>
            <Typography variant="h3">Profile Setting</Typography>
          </Grid>
          {role !== "teacher" && (
            <Grid item xs={12} lg={2}>
              <OCButton variant="error" label="Leave" onClick={onTappedLeave} />
            </Grid>
          )}
        </Grid>

        <Grid container columnSpacing={1} rowSpacing="20px">
          <Grid item xs={12} lg={5} className={classes.row}>
            <Typography variant="h4">Firstname :</Typography>
            <OCTextField
              variant="outline"
              maxWidth="150px"
              name="firstname"
              value={content.firstname}
              onChange={(e) => handleChange(e)}
            />
          </Grid>

          <Grid item xs={12} lg={5} className={classes.row}>
            <Typography variant="h4">Lastname :</Typography>
            <OCTextField
              variant="outline"
              maxWidth="150px"
              name="lastname"
              value={content.lastname}
              onChange={(e) => handleChange(e)}
            />
          </Grid>
        </Grid>

        <Box className={classes.row}>
          <Typography variant="h4">nickname (Optional) :</Typography>
          <OCTextField
            variant="outline"
            maxWidth="100px"
            name="optional_name"
            value={content.optional_name}
            onChange={(e) => handleChange(e)}
          />
        </Box>

        <Box className={classes.row}>
          <OCButton
            label="Save"
            onClick={onTappedSave}
            disabled={isDisabledSaveButton()}
          />
        </Box>
      </Box>
    </>
  );
};

export default ClassSetting;
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
  roleUpdateBox: {
    gap: "10px",
    justifyContent: "space-between",
    alignContent: "center",
    backgroundColor: onClassColorTheme.white,
    borderRadius: "20px",
    border: "1px solid",
    borderColor: alpha(onClassColorTheme.darkGrey, 0.3),
    padding: "16px",
    display: "flex",
    flexDirection: "column",
  },
}));
