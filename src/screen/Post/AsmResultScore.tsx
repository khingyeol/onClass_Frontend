import {
  alpha,
  Avatar,
  Box,
  Button,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { onClassColorTheme } from "../../common/theme/onClassColorTheme";
import { makeStyles } from "@mui/styles";
import OCIconButton from "../../common/OCIconButton";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getClassId } from "../../store/classsdetail/selector";
import {
  assignmentGet,
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
} from "@mui/x-data-grid";
import OCButton from "../../common/OCButton";

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

  const figmaRows = [
    {
      id: "12",
      name: "John Doe",
      status: "มอบหมายแล้ว",
      score: "",
      file: "",
    },
    {
      id: "13",
      name: "Jerry Hanna",
      status: "มอบหมายแล้ว",
      score: "",
      file: "",
    },
    {
      id: "14",
      name: "Roxanne Mann",
      status: "ส่งแล้ว",
      score: "",
      file: "",
    },
    {
      id: "15",
      name: "Martha Thompson",
      status: "เกินกำหนด",
      score: "",
      file: "",
    },
  ];

  const renderStatus = (status: string) => {
    if (status === "ส่งแล้ว") {
      return <Typography color="#41B094">{status}</Typography>;
    } else if (status === "เกินกำหนด") {
      return <Typography color="#B04141">{status}</Typography>;
    } else {
      return <Typography color="#000">{status}</Typography>;
    }
  };

  const figmaColumns = [
    { field: "id", editable: false, flex: 1 },
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
      // type: "actions",
      // getActions: (params) => [<Box>{renderStatus(params.row.status)}</Box>],
    },
    { field: "score", headerName: "คะแนน (10 pts.)", editable: true, flex: 1 },
    {
      field: "file",
      headerName: "file",
      editable: false,
      type: "actions",
      // valueOp
      getActions: (i: any) => [
        <Button onClick={() => { }}>โหลด</Button>,
        // <GridActionsCellItem label="ดู" onClick={() => {}} />
      ],
    },
  ];

  const MappedData = (data: any[]) => {
    const myArray2 = new Array();

    data.map((item, index) => {
      const temp = {
        ...item,
        id: item.student_id,
        // name: `${item.firstname} ${item.lastname}`,
      };
      myArray2.push({
        ...temp,

        // ...MappedASMscore(item.assignment),
      });
    });
    console.log("temp", myArray2);
    return myArray2;
  };

  const columns = [
    { field: "id", editable: false },
    // {
    //   field: "status",
    //   headerName: "สถานะ",
    //   editable: false,
    //   flex: 1,
    //   renderCell: (params: any) => {
    //     return (
    //       <Box
    //         sx={{ width: "100%", textAlign: "center", wordBreak: "break-word" }}
    //       >
    //         {renderStatus(params.row.status)}
    //       </Box>
    //     );
    //   },
    // },
    // { field: "score", headerName: "คะแนน (10 pts.)", editable: true, flex: 1 },
    { field: "answer_result", headerName: 'คำตอบ (text)', flex: 1},
    { field: "url_result", headerName: 'คำตอบ (url)', flex: 1},
  //   { field: "file_result", headerName: 'ไฟล์',
  //   editable: false,
  //   type: "actions",
  //   getActions: (i: any) => [
  //     <Box>
  //       {i[0].file_name}
  //       <Button onClick={() => { }}>โหลด</Button>,
  //     </Box>
  //   ],
  // },

    // เอาจาก get class ได้มั้ง มี all asm -> ดึง id, name มาเฉยๆ
  ];

  const dataContentUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow };
    setDataContent(
      dataContent.map((row) => (row.id === newRow.id ? updatedRow : row))
    );
    return updatedRow;
  };

  const onClickSubmit = () => {
    console.log("== onclick", dataContent);
  };

  const fetchGetPost = async () => {
    assignmentGet(classid!, id!)
      .then((response) => {
        setAsmContent(response.data.data);
        setDataContent(MappedData(response.data.data.assignment_student_result))
        // if (asmContent && asmContent?.assignment_student_result) {;}

      })
      .catch((error) => {
        // setError(true);
      });
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
              // columns={figmaColumns}
              autoHeight={true}
              getRowHeight={() => "auto"}
              processRowUpdate={dataContentUpdate}
              sx={{ ...gridStyles }}
            />
          </Box>
        </Box>
        <Box padding={{ xs: 1, sm: 1.5 }} />
        {/* <OCButton label={"click"} onClick={onClickSubmit} /> */}
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
