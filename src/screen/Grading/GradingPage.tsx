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
import { makeStyles } from "@mui/styles";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridActionsCellItem,
  GridColumns,
  GridColumnHeaderParams,
} from "@mui/x-data-grid";
import { onClassColorTheme } from "../../common/theme/onClassColorTheme";
import { gql, useQuery } from "@apollo/client";
import { getAllAssignmentsResponse } from "../../services/types/ClassModel";
import { getTodo } from "../../services/class/api_class";
import OCButton from "../../common/OCButton";
import { GetAllExamResponseData } from "../../services/types/getAllExamResponse";
import { getAllExam } from "../../services/class/api_exam";

const GRADES_QUERY = gql`
  query Grades($classCode: String!) {
    grades(class_code: $classCode) {
      student_id
      firstname
      lastname
      optional_name
      assignment {
        grade_id
        title
        type
        score
        max_score
        percentage
      }
      exam {
        grade_id
        title
        type
        score
        max_score
        percentage
      }
    }
  }
`;

const GradingPage: FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pathname = window.location.pathname;
  const { classid, id } = useParams();
  const [qData, setQData] = useState([]);
  const [allAsm, setAllAsm] = useState<getAllAssignmentsResponse[]>([]);
  const [allExam, setAllExam] = useState<GetAllExamResponseData[]>([]);


  const gridStyles = {
    fontSize: "17px",
    "& .MuiDataGrid-columnHeaders": {
      fontSize: "20px",
      fontWeight: 900,
      textWrap: "wrap",
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

  const MappedData = (data: any[]) => {
    const myArray2 = new Array();
    console.log("data", data);

    data.map((item, index) => {
      const temp = {
        id: item.student_id,
        name: `${item.firstname} ${item.lastname}`,
      };
      myArray2.push({
        ...temp,
        ...MappedASMscore(item.assignment),
        ...MappedASMscore(item.exam),
      });
    });
    console.log("temp", myArray2);
    return myArray2;
  };

  const findPercentage = (score:number, max:number, per:number) => {
    const summary = score

    return (per/100)*max
  }

  const MappedASMscore = (data: any[]) => {
    var scoreSummary = 0;
    var maxSummary = 0;
    data.forEach(item => {
      scoreSummary += findPercentage(item.score, item.max_score, item.percentage)
      maxSummary += item.max_score
      console.log('grade', item, scoreSummary)
    })

    return data.reduce(
      (obj, item) => 
        Object.assign(obj, {
          [item.grade_id]: item.score,
          // summary : scoreSummary,
          percentage: (scoreSummary / maxSummary * 100).toFixed(2),
        })
      ,
      {}
    );
  };

  const MappedASMname = (data: any[]) => {
    console.log('name', data)
    return data.map((item) => {
      const temp: GridColDef = {
        editable: true,
        flex: 1,
        field: item.id,
        renderHeader: (params: GridColumnHeaderParams) => (
          <div style={{textAlign: 'center'}}>
          <Typography>{item.assignment_name}</Typography>
          <Typography variant='h4'>({item.score} pts.)</Typography>
          </div>
        ),
        // headerName: `${item.assignment_name} (${item.score})`,
      };
      // console.log('temp', temp)
      return temp;
    });
  };

  const MappedEXAMname = (data: any[]) => {
    return data.map((item) => {
      const temp: GridColDef = {
        editable: true,
        flex: 1,
        field: item.id,
        renderHeader: (params: GridColumnHeaderParams) => (
          <div style={{textAlign: 'center'}}>
          <Typography>{item.exam_name}</Typography>
          <Typography variant='h4'>({item.score} pts.)</Typography>
          </div>
        ),
        // headerName: `${item.assignment_name} (${item.score})`,
      };
      // console.log('temp', temp)
      return temp;
    });
  }

  const columns: GridColDef[] = [
    { field: "name", editable: false },
    // { field: "", headerName: ''}
    ...MappedASMname(allAsm),
    ...MappedEXAMname(allExam),
    // { field: "summary", headerName: "คะแนนรวม", editable: false},
    { field: "percentage", headerName: "%", editable: false },
    // เอาจาก get class ได้มั้ง มี all asm -> ดึง id, name มาเฉยๆ
  ];

  const fetchGetAllAsm = async () => {
    try {
      const res = await getTodo(classid!);
      console.log("[assignmentAllClass] SUCCESS", classid);
      setAllAsm(res.data.data);
    } catch (err) {
      console.log("[assignmentAllClass] ERROR");
    }
  };

  const fetchGetAllExam = async () => {
    try {
      const res = await getAllExam(classid!);
      setAllExam(res.data.data);
    } catch (err) {
      console.log("[ExamAllClass] ERROR", err);
    }
  };

  const { loading, error, data } = useQuery(GRADES_QUERY, {
    variables: { classCode: classid! },
    fetchPolicy: "network-only",
  });

  

  useEffect(() => {
    fetchGetAllAsm();
    fetchGetAllExam();
    // if (classid && !loading && data && !error) {
    //   console.log("qq", data);
    //   setQData(data.grades);
    // }
  }, []);

  useMemo(()=>{
    if(data) {
      console.log('MYLOG: ', data);
      setQData(data.grades);
    }
  },[data])


  return (
    <>
      <>
        <Box className={classes.postbox}>
          {/* Headline */}
          <Box className={classes.boxhead}>
                  <Box className={classes.headline}>
                    <Box style={{ alignSelf: "center" }}>
                      <Typography
                        variant="title3"
                        color={onClassColorTheme.green}
                      >
                        Grading | คะแนนรวม
                      </Typography>
    
                      
                    </Box>
                  </Box>
                  <Typography variant="title3" color={onClassColorTheme.black}>
                  </Typography>
                </Box>
          {/* Content */}
          <Box className={classes.contents}>
            <DataGrid
              isRowSelectable={() => false}
              rows={MappedData(qData)}
              columns={columns}
              autoHeight={true}
              getRowHeight={() => "auto"}
              sx={{ ...gridStyles }}
            />
          </Box>
          {/* <OCButton
            label={"log"}
            onClick={() => {
              console.log("update", qData);
            }}
          /> */}
        </Box>
        <Box padding={{ xs: 1, sm: 1.5 }} />
      </>
    </>
  );
};

export default GradingPage;

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
