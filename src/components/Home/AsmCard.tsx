import { alpha, Box, Theme, Typography, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { FC } from "react";
import OCIconButton from "../../common/OCIconButton";
import { onClassColorTheme } from "../../common/theme/onClassColorTheme";
import AsmIcon from "../../assets/svg/icon_asm.svg";

interface AsmCardProps {
  icon?: any;
  title?: string;
  desc?: string;
  midText?: string;
  trailText?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const AsmCard: FC<AsmCardProps> = (props) => {
  const { icon, title, desc, midText, trailText, onClick } = props;
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const classes = useStyles();

  return (
    <>
      <Box display="flex" onClick={onClick}>
        <Box className={classes.asmBox}>
          {/* LEFT SIDE */}
          <Box display="flex" flexWrap="wrap" alignContent="center" gap={2}>
            <OCIconButton
              icon={icon ?? AsmIcon}
              color={onClassColorTheme.green}
              size="56px"
            />

            <Box alignSelf="center">
              <Typography variant="h4">{title}</Typography>
              <Typography variant="description" color={onClassColorTheme.grey}>
                {desc}
              </Typography>
            </Box>
          </Box>

          <Box
            display="flex"
            alignSelf="center"
            flexGrow="1"
            justifyContent={{ xs: "space-between", sm: "space-around" }}
          >
            {/* MIDDLE */}
            <Typography variant="description" alignSelf="center">
              {midText}
            </Typography>

            {/* RIGHT SIDE */}
            <Typography
              variant="h4"
              color={onClassColorTheme.green}
              alignSelf="center"
            >
              {trailText}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AsmCard;


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
    [theme.breakpoints.down("sm")]: {
      // display: "grid",
      minHeight: "108px",
      padding: "0px 20px",
      borderRadius: "31.5px",
    },
  },
}));