import { alpha, Box, Theme, Typography } from "@mui/material";
import React, { FC, memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onClassColorTheme } from "../../../common/theme/onClassColorTheme";
import { makeStyles } from "@mui/styles";
import { getAllClass } from "../../../services/class/api_class";
import { useDispatch } from "react-redux";
import { updateClassDetail } from "../../../store/classsdetail/action";
import { GetAllClassResponseData } from "../../../services/types/getAllClassResponse";
import { AllStageType, updateCurrentStage } from "../../../store/stage/action";

const useStyles = makeStyles((theme: Theme) => ({
  class_list: {
    width: "73%",
    minHeight: "55px",
    fontSize: "18px",
    cursor: "pointer",
    display: "grid",
    alignItems: "center",
    padding: "5px 0px 5px 27%",
    "&:hover": {
      backgroundColor: alpha(onClassColorTheme.green, 0.1),
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: "50px",
      paddingY: "10px",
    }
  },
}));

const NavCallClass: FC = () => {
  const [content, setContent] = useState<GetAllClassResponseData[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();

  const fetchGetAllClass = async () => {
    // setContent(mockedData.mockedAllClass);
    const res = await getAllClass();
    console.log(res)
    if (res.data.result === 'OK') {
        setContent(res.data.data)
        // console.log("eiei",res.data.data)
    }
    else {
        setContent([])
    }
  };

  const onClickClass = (item: GetAllClassResponseData) => {
    navigate("/" + item.class_code);
    dispatch(updateClassDetail(item));
    dispatch(updateCurrentStage(AllStageType.CLASS));
    console.log('onClickCard', item.class_code);
  };

  useEffect(() => {
    fetchGetAllClass();
  }, []);

  const classlist = content.map(
    (item: GetAllClassResponseData) => (
      // <Link to={'/'+item.class_code} style={{ textDecoration: 'none' }}>
      <Box
        key={item.class_code}
        onClick={() => onClickClass(item)}
        className={classes.class_list}
      >
        <Box>
        <Typography variant="body1">
        {item.class_name}
          </Typography>
          <Typography variant="description" color={onClassColorTheme.grey}>
            {item.class_section}
          </Typography>
        </Box>
      </Box>
    )
    // </Link>
  );

  return <> {classlist} </>;
};
export default memo(NavCallClass);
