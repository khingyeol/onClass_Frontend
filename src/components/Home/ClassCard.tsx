import { Box, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onClassColorTheme } from "../../common/theme/onClassColorTheme";
import { ClassDetail, updateClassDetail } from "../../store/classsdetail/action";

interface getAllClassResponse {
  class_code: string;
  class_name: string;
  class_section: string;
  teacher: {
    profile_pic: string;
    name: {
      firstname: string;
      lastname: string;
    };
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  class_list: {
    display: "inline-block",
    // display={{ xs: "block", sm: "inline-block" }},
    position: "relative",
    boxShadow: "0px 10px 19px rgba(0, 0, 0, 0.16)",
    borderRadius: "35px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    width: "340px",
    height: "200px",
    cursor: "pointer",
    backgroundColor: onClassColorTheme.white,
    margin: "10px 20px",
    transition: "all 0.4s ease",
    "&:hover": {
      transform: "scale(1.05)",
      // backgroundColor: onClassColorTheme.lightgrey,
      marginRight: "calc(5%+10px)",
      marginLeft: "calc(5%+10px)",
    },
    [theme.breakpoints.down("sm")]: {
      width: "306px",
      height: "180px",
      margin: "0px 0px",
    },
  },
  coverImg: {
    objectFit: "cover",
    width: "100%",
    height: "5.2em",
  },
  teacherImg: {
    objectFit: "cover",
    width: "1.8em",
    height: "1.8em",
    borderRadius: "1.8em",
  },
}));

const ClassCard: FC<{ item: getAllClassResponse }> = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { item } = props;

  const dataClassDetail: ClassDetail = {
    classId: item.class_code,
    className: item.class_name,
  }

  const onClickCard = () => {
    navigate("/" + item.class_code);
    dispatch(updateClassDetail(dataClassDetail));
    console.log('onClickCard', dataClassDetail.classId);
  };

  return (
    <>
      <Box
        key={item.class_code}
        onClick={() => onClickCard()}
        className={classes.class_list}
      >
        <Box>
          <Box position="absolute" padding="1.2em">
            <Typography variant="h2">{item.class_name}</Typography>
            <Typography variant="description">{item.class_section}</Typography>
          </Box>
          <img
            src="https://img.freepik.com/free-vector/christmas-holiday-golden-pattern-background-template-greeting-card-design_206636-74.jpg?size=626&ext=jpg"
            className={classes.coverImg}
            alt="cover-img"
          />
        </Box>

        <Box position="absolute" bottom={0} right={0} padding="1.2em">
          <Box display="flex" alignItems="center" sx={{ columnGap: 1 }}>
            <Typography variant="description">
              {item.teacher.name.firstname + " " + item.teacher.name.lastname}
            </Typography>
            <img
              src={item.teacher.profile_pic}
              className={classes.teacherImg}
              alt="teacher-pic"
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ClassCard;
