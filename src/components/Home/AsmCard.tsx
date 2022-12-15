import { alpha, Box, Theme, Typography, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OCIconButton from "../../common/OCIconButton";
import { onClassColorTheme } from "../../common/theme/onClassColorTheme";
import { mockedData } from "../../mocked/mockedData";
import AsmIcon from "../../assets/svg/icon_asm.svg";

interface Comment {
    comment_author_id: String,
    content: String,
    created: String, //Date,
}

interface getAllAssignmentsResponse {
    class_code: String,
    class_name: String,
    assignment_name: String,
    assignment_description: String,
    turnin_late: Boolean,
    score: Number,
    assignment_optional_file: string[],
    comment: Comment[],
    assignment_start_date: String, //Date,
    assignment_end_date: String, //Date,
    created: String, //Date,
    status: String,
};
const useStyles = makeStyles((theme: Theme) => ({
    asmBox: {
        backgroundColor: onClassColorTheme.white,
        borderRadius: "35px",
        border: "1px solid",
        borderColor: alpha(onClassColorTheme.darkGrey, 0.3),
        minHeight: "120px",
        width: "100%",
        padding: "0px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignContent: "center",
        flexWrap: "wrap",
        cursor: "pointer",
        transition: "all 0.4s ease",
        "&:hover": {
            backgroundColor: alpha(onClassColorTheme.green, 0.05),
            borderColor: alpha(onClassColorTheme.green, 0.3),
          },      
        [theme.breakpoints.down('sm')]: {
            // display: "grid",
            minHeight: "108px",
            padding: "0px 20px",
            borderRadius: "31.5px",
        }      
    }
}));

const AsmCard: FC<{ item: getAllAssignmentsResponse }> = (props) => {
    const { item } = props;
    const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
    const classes = useStyles();

    return (
        <>
        <Box display="flex" >

        <Box className={classes.asmBox} >
            {/* LEFT SIDE */}
            <Box display="flex" flexWrap="wrap" alignContent="center" gap={2}>
            <OCIconButton href="#" icon={AsmIcon} color={onClassColorTheme.green} size="56px" />

            <Box alignSelf="center">
                <Typography variant="h4">{item.assignment_name}</Typography>
                <Typography variant="description" color={onClassColorTheme.grey} >{item.class_name}</Typography>
            </Box>
            </Box>

            <Box display="flex" alignSelf="center" flexGrow="1" justifyContent={{ xs: "space-between", sm: "space-around"}}>
            <Typography variant="description" alignSelf="center">
                {item.assignment_end_date}
            </Typography>

            <Typography variant="h4" color={onClassColorTheme.green} alignSelf="center">
                {item.status}
            </Typography>
            </Box>
        </Box>
        </Box>
        </>
    );
  };
  
  export default AsmCard;
