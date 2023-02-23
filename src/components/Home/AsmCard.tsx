import {
  alpha,
  Box,
  Grid,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
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
  trailTextColor?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const AsmCard: FC<AsmCardProps> = (props) => {
  const { icon, title, desc, midText, trailText, trailTextColor, onClick } =
    props;
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));
  const classes = useStyles();

  return (
    <>
      <Box display="flex" onClick={onClick}>
        <Grid container className={classes.asmBox}>
          {/* LEFT SIDE */}
          <Grid
            item
            xs={12}
            sm={4}
            display="flex"
            flexWrap="wrap"
            alignContent="center"
            gap={{ xs: 1.5, sm: 2 }}
          >
            <OCIconButton
              icon={icon ?? AsmIcon}
              color={onClassColorTheme.green}
              size={isDesktop ? "56px" : "45px"}
            />

            <Box alignSelf="center">
              <Typography variant="title3">{title}</Typography>
              <Typography variant="description" color={onClassColorTheme.grey}>
                {desc}
              </Typography>
            </Box>
          </Grid>

          <Grid
            item
            xs={6}
            sm={4}
            textAlign={{ xs: "left", sm: "center" }}
            className={classes.box}
          >
            {/* MIDDLE */}
            <Typography
              variant="description"
              alignSelf="center"
              color={trailTextColor ?? onClassColorTheme.green}
            >
              {midText}
            </Typography>
          </Grid>

          <Grid
            item
            xs={6}
            sm={4}
            textAlign={{ xs: "end", sm: "right" }}
            className={classes.box}
          >
            {/* RIGHT SIDE */}
            <Typography
              variant="title3"
              color={trailTextColor ?? onClassColorTheme.green}
            >
              {trailText}
            </Typography>
          </Grid>
        </Grid>
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
      minHeight: "108px",
      padding: "0px 18px",
      borderRadius: "28px",
      borderColor: alpha(onClassColorTheme.darkGrey, 0.2),
    },
  },
  box: {
    paddingTop: "0",
    alignSelf: "center",
    flexGrow: 1,
    [theme.breakpoints.down("sm")]: {
      paddingTop: "5px",
      alignSelf: "end",
    },
  },
}));
