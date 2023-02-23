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
import { makeStyles } from "@mui/styles";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridActionsCellItem,
  GridColumns,
} from "@mui/x-data-grid";
import { onClassColorTheme } from "../../common/theme/onClassColorTheme";
import { gql, useQuery, useSubscription } from "@apollo/client";
import { getAllAssignmentsResponse } from "../../services/types/ClassModel";
import { getTodo } from "../../services/class/api_class";
import OCButton from "../../common/OCButton";

const GradingPage: FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pathname = window.location.pathname;
  const { classid, id } = useParams();
  const [qData, setQData] = useState([]);
  const [allAsm, setAllAsm] = useState<getAllAssignmentsResponse[]>([]);

  const GRADES_QUERY = gql`
    query GradesQuery($classCode: String!) {
      grades(class_code: $classCode) {
        id
        firstname
        lastname
        optional_name
        assignment {
          id
          type
          title
          score
          max_score
          percentage
        }
        exam {
          id
          type
          title
          score
          max_score
          percentage
        }
      }
    }
  `;

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

  const MappedData = (data: any[]) => {
    const myArray2 = new Array();

    data.map((item, index) => {
      const temp = {
        id: item.id,
        name: `${item.firstname} ${item.lastname}`,
      };
      myArray2.push({
        ...temp,
        ...MappedASMscore(item.assignment),
      });
    });
    console.log("temp", myArray2);
    return myArray2;
  };

  const MappedASMscore = (data: any[]) => {
    return data.reduce(
      (obj, item) =>
        Object.assign(obj, {
          [item.id]: item.score,
        }),
      {}
    );
  };

  const MappedASMname = (data: any[]) => {
    return data.map((item) => {
      const temp = {
        editable: true,
        flex: 1,
        field: item.id,
        headerName: item.assignment_name,
      };
      // console.log('temp', temp)
      return temp;
    });
  };

  const columns: GridColDef[] = [
    { field: "name", editable: false },
    // { field: "", headerName: ''}
    ...MappedASMname(allAsm),
    // เอาจาก get class ได้มั้ง มี all asm -> ดึง id, name มาเฉยๆ
  ];

  const fetchGetAllAsm = async () => {
    try {
      const res = await getTodo(classid!);
      console.log("[assignmentAllClass] ERROR", classid);
      setAllAsm(res.data.data);
    } catch (err) {
      console.log("[assignmentAllClass] ERROR");
    }
  };

  const { loading: loadingQ, data: dataQ, refetch } = useQuery(GRADES_QUERY, {
    variables: { classCode: classid },
  });

  const fetchAgain = () => {
    refetch({classCode: classid})
  }

  useEffect(() => {
    fetchGetAllAsm();
    if (classid && !loadingQ && dataQ) {
      console.log("qq", dataQ.grades);
      setQData(dataQ.grades)
      // dispatch(updateClassFeed(dataQ.feeds));
    }

    // if (window.performance) {
    //     if (performance.navigation.type == 1) {
    //         refetch({classCode: classid})
    //     } else {
    //     //   alert( "This page is not reloaded");
    //     }
    //   }
    // return () => {
    //     window.removeEventListener("beforeunload", fetchAgain())
    // }
  }, []);

  return (
    <>
      <>
        <Box className={classes.postbox}>
          {/* Headline */}
          {/* <Box className={classes.boxhead}>
                  <Box className={classes.headline}>
                    <Box style={{ alignSelf: "center" }}>
                      <Typography
                        variant="title3"
                        color={onClassColorTheme.green}
                      >
                        titleeeeee
                      </Typography>
    
                      
                    </Box>
                  </Box>
                  <Typography variant="title3" color={onClassColorTheme.black}>
                  </Typography>
                </Box> */}
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
