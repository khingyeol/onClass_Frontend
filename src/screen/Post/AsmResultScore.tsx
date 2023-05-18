import {
  alpha,
  Avatar,
  Box,
  Button,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { FC, useEffect, useMemo, useState } from "react";
import { onClassColorTheme } from "../../common/theme/onClassColorTheme";
import { makeStyles } from "@mui/styles";
import OCIconButton from "../../common/OCIconButton";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getClassId } from "../../store/classsdetail/selector";
import {
  assignmentGet,
  assignmentScoreSubmit,
  postGet,
  postPollVote,
} from "../../services/class/api_class";
import { getSelectedId, getSelectedType } from "../../store/stage/selector";
import IconASM from "../../assets/svg/icon_asm.svg";
import { formatDate, formatDateTime } from "../../utils/formatDate";
import CommentSection from "../../components/Post/Comment";
import NotFoundPage from "../common/NotFoundPage";
import {
  AssignmentModel,
  PollModel,
  PostModel,
} from "../../services/types/ClassModel";
import { gql, useQuery, useSubscription } from "@apollo/client";
import OCAvatar from "../../common/OCAvatar";
import OCPollSection from "../../common/OCPollSection";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridActionsCellItem,
  GridColumns,
  GridRowModel,
  GridRowId,
} from "@mui/x-data-grid";
import OCButton from "../../common/OCButton";
import {
  AssignmentScoreSubmit,
  AssignmentScoreSubmitScoreData,
} from "../../services/types/patchAssignmentScoreSubmit";

const AsmResultScore: FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pathname = window.location.pathname;
  // const postid = useSelector(getSelectedId);
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const [asmContent, setAsmContent] = useState<AssignmentModel>();
  const { classid, id } = useParams();
  const [dataContent, setDataContent] = useState<any[]>([]);
  const [rowId, setRowId] = useState<GridRowId | null>(null);
  // const [toggle, setToggle] = useState

  const gridStyles = {
    fontSize: "17px",
    "& .MuiDataGrid-columnHeaders": {
      fontSize: "18px",
      fontWeight: 900,
    },
    "& .MuiDataGrid-footerContainer": {
      fontSize: "16px",
    },
    "& .MuiDataGrid-row:hover": {
      bgcolor: "rgba(65,176,148, 0.1)",
    },
    "& .MuiDataGrid-row.Mui-selected": {
      bgcolor: "rgba(65,176,148, 0.15)",
      ":hover": {
        bgcolor: "rgba(65,176,148, 0.1)",
      },
    },
    "& .MuiDataGrid-cell": {
      paddingY: "10px",
      ":focus": {
        outline: "2px solid rgba(65,176,148)",
      },
    },
  };

  const renderStatus = (status: string) => {
    if (status === "ส่งแล้ว") {
      return <Typography color="#41B094">{status}</Typography>;
    } else if (status === "เกินกำหนด") {
      return <Typography color="#B04141">{status}</Typography>;
    } else if (status === "ส่งช้า") {
      return <Typography color="#B04141">{status}</Typography>;
    } else {
      return <Typography color="#000">{status}</Typography>;
    }
  };

  const mappedPrefillScore = (result: any[], item: any) => {
    const std = result.filter((obj) => obj.student_id === item.student_id)
    return std.length > 0 ? std[0].score : null
  }

  const MappedData = (data: any[], result: any[]) => {
    const myArray2 = new Array();
    data.map((item, index) => {
      const temp = {
        ...item,
        id: item.student_id,
        score: result.length > 0 ? mappedPrefillScore(result, item) : null
      };
      myArray2.push({
        ...temp,
      });
    });
    return myArray2;
  };

  const columns = [
    {
      field: "firstname",
      headerName: "ชื่อ",
      editable: false,
      flex: 1,
      renderCell: (params: any) => {
        return (
          <Box
            sx={{ width: "100%", textAlign: "center", wordBreak: "break-word" }}
          >
            {`${params.row.firstname} ${params.row.lastname}`}
          </Box>
        );
      },
    },
    { field: "optional_name", headerName: "ชื่ออื่นๆ", editable: false },
    {
      field: "status",
      headerName: "สถานะ",
      editable: false,
      flex: 1,
      renderCell: (params: any) => {
        return (
          <Box
            sx={{ width: "100%", textAlign: "center", wordBreak: "break-word" }}
          >
            {renderStatus(params.row.status)}
          </Box>
        );
      },
    },
    {
      field: "score",
      headerName: `คะแนน (${asmContent?.score} pts.)`,
      type: "number",
      editable: true,
      flex: 1,
    },
    { field: "answer_result", headerName: "คำตอบ (text)", flex: 1 },
    {
      field: "url_result", headerName: "คำตอบ (url)", flex: 1,
      renderCell: (params: any) => {
        return (params.row.url_result && <a href={`http://${params.row.url_result}`} target="_blank" rel="noreferrer">URL</a>
        );
        ;
      }
    },
    {
      field: "file_result",
      headerName: "ไฟล์",
      editable: false,
      type: "actions",
      getActions: (i: any) => [
        <Box>
          {i.row.file_result.map((obj: any) => {
            console.log('obj', obj)
            return <a href={obj.file_path} download={obj.file_name}>File</a>
          })}
        </Box>,
      ],
    },
  ];

  const updateState = React.useCallback((key: string, value: string | number, id: number) => {
    const newState = dataContent.map((obj) => {
      if (obj.id === id) {
        return { ...obj, [key]: value };
      }
      return obj;
    });
    // console.log("newState", newState);
    setDataContent(newState);
  }, [dataContent]);

  const handleRowEditCommit = React.useCallback((params: GridRowModel) => {
    setRowId(params.id);
    dataContent.find((obj, index) => {
      console.log(obj);
      if (obj.id === params.id) {
        // console.log(params);
        updateState(params.field, params.value, params.id);
        return true;
      }
    });
  }, [dataContent, updateState]);

  const mappedScore = async () => {
    const testArr: AssignmentScoreSubmitScoreData[] = [];

    Promise.all(
      dataContent.map((item) => {
        const temp = {
          student_id: item.id,
          score: item.score
        };
        testArr.push({
          ...temp,
        });
      })
    );
    // console.log('promise', testArr)
    return testArr;
  };

  const onClickSubmit = async () => {
    let scoreDT = await mappedScore();
    const reqBody: AssignmentScoreSubmit = {
      class_code: classid!,
      assignment_id: id!,
      data: scoreDT,
    };
    await assignmentScoreSubmit(reqBody)
  };

  const fetchGetPost = async () => {
    assignmentGet(classid!, id!)
      .then((response) => {
        setAsmContent(response.data.data);
        setDataContent(
          MappedData(response.data.data.assignment_student_result, response.data.data.assignment_student_score)
        );
      })
      .catch((error) => { });
  };

  useEffect(() => {
    fetchGetPost();
  }, []);

  return (
    <>
      <>
        <Box className={classes.postbox}>
          {/* Headline */}
          <Box className={classes.boxhead}>
            <Box className={classes.headline}>
              {/*  */}
              <Box style={{ alignSelf: "center" }}>
                <Typography variant="title3" color={onClassColorTheme.green}>
                  {asmContent?.assignment_name}
                </Typography>
              </Box>
            </Box>
            <Typography variant="title3" color={onClassColorTheme.black}>
              {/* right */}
            </Typography>
          </Box>
          {/* Content */}
          <Box className={classes.contents}>
            <DataGrid
              isRowSelectable={() => false}
              rows={dataContent}
              columns={columns}
              getRowId={(row) => row.id}
              // columns={figmaColumns}
              autoHeight={true}
              getRowHeight={() => "auto"}
              onCellEditCommit={handleRowEditCommit}
              // processRowUpdate={dataContentUpdate}
              sx={{ ...gridStyles }}
            />
          </Box>
        </Box>
        <Box padding={{ xs: 1, sm: 1.5 }} />
        <OCButton label={"cancel"} variant="outline" onClick={() => setDataContent(
          MappedData(asmContent?.assignment_student_result ?? [], asmContent?.assignment_student_score ?? [])
        )} />
        <OCButton label={"submit"} onClick={onClickSubmit} />
      </>
    </>
  );
};

export default AsmResultScore;

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
  boxhead: {
    display: "flex",
    justifyContent: "space-between",
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
    wordBreak: "break-word",
    whiteSpace: "pre-line",
    padding: "0.75rem 0",
    margin: "0.75rem 0 0 0",
    borderTop: "1px solid ",
    borderColor: alpha(onClassColorTheme.darkGrey, 0.3),
    [theme.breakpoints.down("sm")]: {
      fontSize: "15px",
      borderColor: alpha(onClassColorTheme.darkGrey, 0.2),
    },
  },
  comments: {
    borderTop: "1px solid rgba(191, 191,191, 0.2)",
    display: "flex",
    paddingTop: "10px",
    gap: "15px",
    bottom: "0",
  },
}));
