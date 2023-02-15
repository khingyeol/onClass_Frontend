import { Box, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import OtpInput from "react18-input-otp";
import React, { FC, useEffect, useState } from "react";
import { onClassColorTheme } from "../../common/theme/onClassColorTheme";
import OCButton from "../../common/OCButton";
import { useDispatch, useSelector } from "react-redux";
import { getUserEmail } from "../../store/userdata/selector";
import { confirmOTP } from "../../services/auth/api_auth";
import { useNavigate } from "react-router-dom";
import { displayDialog, hideDialog } from "../../store/dialog/action";

const OtpPage: FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector(getUserEmail);
  const [code, setCode] = useState<any>("");
  const [isError, setIsError] = useState(false);

  const handleChange = (value: any) => {
    var reg = /^\d+\.?\d*$/;

    if (!reg.test(value)) {
      setIsError(true);
    } else {
      setIsError(false);
    }
    setCode(value);
  };

  const onSubmit = async () => {
    try {
      await confirmOTP(email!, code);
      dispatch(displayDialog({
        id: 'confirmOTP',
        isShow: true,
        title: "Login",
        message: "Already confirm OTP!",
        primaryLabel: 'Close',
        onPrimaryAction: () => { dispatch(hideDialog()) },
      }))
      navigate("/home");
    } catch (err: any) {
      console.log("otp error");
      dispatch(displayDialog({
        id: 'confirmOTP',
        isShow: true,
        title: "OTP",
        message: err.message,
        primaryLabel: 'Close',
        onPrimaryAction: () => { dispatch(hideDialog()) },
      }))
    }
    console.log("on submit w/ code", code);
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.box}>
        <Box className={classes.content}>
          <Typography variant="h1">Email verification</Typography>
          <Box>
            {isError && (
              <Typography
                fontSize="12px"
                color={onClassColorTheme.error}
                textAlign="center"
              >
                Verification code must be Number only!
              </Typography>
            )}{" "}
            <OtpInput
              inputStyle={{
                fontSize: "1.5rem",
                width: "90%",
                maxWidth: "2.7rem",
                height: "3.6rem",
                margin: "1rem 0.2rem",
                border: "none",
                borderRadius: "15px",
                backgroundColor: onClassColorTheme.lightgrey,
                // '&:focus': {
                //     borderColor: onClassColorTheme.primary,
                // }
              }}
              value={code}
              onChange={handleChange}
              focusStyle={{
                border: "1.5px solid #41B094",
              }}
              errorStyle={{
                border: "1.5px solid #B04141",
              }}
              hasErrored={isError}
              numInputs={6}
            // onSubmit
            />
            <div style={{ textAlign: "center" }}>
              <Typography fontSize="18px" color={onClassColorTheme.grey}>
                Enter a verification code we've sent to your account!
              </Typography>
              <Typography fontSize="18px" color={onClassColorTheme.green}>
                {email}
              </Typography>
            </div>
          </Box>
          <OCButton
            disabled={isError || code.length < 6}
            sx={{ width: "190px" }}
            label={"submit"}
            onClick={() => onSubmit()}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default OtpPage;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    padding: "0 40px",
    margin: "0 40px",
    position: "relative",
    borderRadius: "35px",
    width: "80%",
    maxWidth: "400px",
    // height: "650px",
    display: "flex",
    justifyContent: "center",
    boxShadow: "0px 10px 19px rgba(0, 0, 0, 0.16)",
    [theme.breakpoints.down("sm")]: {
      padding: "0 20px",
      margin: "10px 40px",
      height: "auto",
    },
  },
  content: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    padding: "50px 0",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "40px",
    [theme.breakpoints.down("sm")]: {
      padding: "80px 0",
    },
  },
}));
