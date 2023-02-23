import { Dialog, Link, Theme, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { FC, memo, useState } from "react";
import { makeStyles } from "@mui/styles";
import OCButton from "../../common/OCButton";
import OCTextfield from "../../common/OCTextfield";
import { signIn, signUp } from "../../services/auth/api_auth";
import {
  cognitoUserDataModel,
  onClassRegisterModel,
} from "../../services/auth/api_auth";
import { updateUsername } from "../../store/userdata/action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { displayDialog, hideDialog } from "../../store/dialog/action";
import { createAvatar } from "@dicebear/core";
import { croodles } from "@dicebear/collection";

interface AuthCardProps {
  type: "login" | "register";
  onClick: (event: any) => void;
}

const AuthCard: FC<AuthCardProps> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginTF, setLoginTF] = useState<cognitoUserDataModel>();
  const [cfPassword, setCfPassword] = useState("");
  // const [svgUri, setSvgUri] = useState("");
  const [isPwError, setIsPwError] = useState(false);
  const [registerTF, setRegisterTF] = useState<onClassRegisterModel>({
    username: "",
    password: "",
    email: "",
    name: {
      firstname: "",
      lastname: "",
    },
    profile_pic: "",
  });
  const { type, onClick } = props;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (type === "login") {
      setLoginTF({
        ...loginTF!,
        [e.target.name]: e.target.value,
      });
    } else {
      switch (e.target.name) {
        case "firstname":
        case "lastname":
          setRegisterTF({
            ...registerTF,
            name: {
              ...registerTF.name,
              [e.target.name]: e.target.value,
            },
          });
          break;

        case "password":
          setRegisterTF({
            ...registerTF,
            password: e.target.value,
          });
          if (e.target.value === cfPassword) {
            setIsPwError(false);
          } else {
            setIsPwError(true);
          }
          break;

        case "cfpassword":
          setCfPassword(e.target.value);
          if (e.target.value === registerTF.password) {
            setIsPwError(false);
          } else {
            setIsPwError(true);
          }
          break;

        default:
          setRegisterTF({
            ...registerTF,
            [e.target.name]: e.target.value,
          });
      }
    }
  };

  const isDisableSubmit = () => {
    if (type === "login") {
      if (!loginTF?.username || !loginTF?.password) {
        return true;
      }
    } else {
      if (
        registerTF?.username.length < 1 ||
        registerTF?.name.firstname.length < 1 ||
        registerTF?.name.lastname.length < 1 ||
        registerTF?.email.length < 1 ||
        registerTF.password.length < 1 ||
        isPwError === true
      ) {
        return true;
      }
    }
    return false;
  };

  const onTappedLogin = async () => {
    console.log("ontap loggin");
    if (type === "login") {
      // type Login
      dispatch(updateUsername(loginTF?.username!));
      try {
        await signIn(loginTF!.username, loginTF!.password);
        console.log("[onTappedLogin] login pass!");
        navigate("/home");
      } catch (err: any) {
        console.log('MYLOG: login error code', err.code);
        if (err.code === "UserNotConfirmedException") {
          console.log("[onTappedLogin] need to confirm code");
          navigate("/otp");
        } else {
          console.log("[!!]", err);
          dispatch(
            displayDialog({
              id: "onTappedLogin",
              isShow: true,
              title: "Login",
              message: err.message || err.response.status,
              primaryLabel: "Close",
              onPrimaryAction: () => {
                dispatch(hideDialog());
              },
            })
          );
        }
      }
    } else {
      // type Register
      const avatar = createAvatar(croodles, {
        seed: registerTF.name.firstname,
        size: 64,
      });

      const data: string = await avatar.toDataUri();
      console.log("data uri", data);

      dispatch(updateUsername(registerTF?.username));
      try {
        await signUp({
          ...registerTF,
          profile_pic: data,
          optional_contact: registerTF.optional_contact
            ? registerTF.optional_contact!
            : " ",
        });
        navigate("/otp");
        console.log("[onTappedLogin] regis");
      } catch (err: any) {
        dispatch(
          displayDialog({
            id: "onTappedRegister",
            isShow: true,
            title: "Register",
            message: err.message || err.response.status,
            primaryLabel: "Close",
            onPrimaryAction: () => {
              dispatch(hideDialog());
            },
          })
        );
      }
    }
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.content}>
        {/* <form onSubmit={onTappedLogin}> */}
        <Typography variant="h1">
          {type === "login" ? "Login" : "Register"}
        </Typography>

        {type === "login" ? (
          <div style={{ display: "grid", gap: "17px" }}>
            {/* <form onSubmit={onTappedLogin}> */}
            <OCTextfield
              name="username"
              value={loginTF?.username}
              onChange={(e) => handleChange(e)}
              label={"Username"}
              fullWidth
              inputProps={{
                style: { textTransform: "lowercase" },
              }}
            />
            <OCTextfield
              name="password"
              type="password"
              value={loginTF?.password}
              onChange={(e) => handleChange(e)}
              label={"Password"}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onTappedLogin();
                }
              }}
              fullWidth
            />
            {/* </form> */}
          </div>
        ) : (
          // <Box display={{xs:"flexbox", sm:"grid"}}>
          // <form onSubmit={onTappedLogin}>
          <Box display="flex" flexDirection="column" gap="12px">
            <div style={{ display: "flex", gap: "17px" }}>
              <OCTextfield
                name="username"
                value={registerTF?.username}
                onChange={(e) => handleChange(e)}
                label={"Username"}
                inputProps={{
                  style: { textTransform: "lowercase" },
                }}
              />
              <Box display={{ xs: "none", sm: "block" }} width="90%"></Box>
            </div>

            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              gap={{ xs: "12px", sm: "17px" }}
            >
              <OCTextfield
                name="firstname"
                value={registerTF?.name.firstname}
                onChange={(e) => handleChange(e)}
                label={"Firstname"}
              />
              <OCTextfield
                name="lastname"
                value={registerTF?.name.lastname}
                onChange={(e) => handleChange(e)}
                label={"Lastname"}
              />
            </Box>
            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              gap={{ xs: "12px", sm: "17px" }}
            >
              <OCTextfield
                name="password"
                type="password"
                value={registerTF?.password}
                onChange={(e) => handleChange(e)}
                label={"Password"}
              />
              <OCTextfield
                type="password"
                name="cfpassword"
                value={cfPassword}
                onChange={(e) => handleChange(e)}
                label={"Confirm Password"}
                error={isPwError}
                helperText={isPwError && "Password doesn't match!"}
              />
            </Box>
            <OCTextfield
              name="email"
              value={registerTF?.email}
              onChange={(e) => handleChange(e)}
              label={"E-mail"}
            />
            <OCTextfield
              name="optional_contact"
              value={registerTF?.optional_contact}
              onChange={(e) => handleChange(e)}
              label={"Phone no. (optional)"}
            />
          </Box>
          // </form>
        )}

        <Box
          flexDirection={{ xs: "column", sm: "row" }}
          sx={{
            display: "flex",
            gap: "26px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <OCButton
            sx={{ width: "190px" }}
            // type="submit"
            label={"submit"}
            disabled={isDisableSubmit()}
            onClick={onTappedLogin}
          />
          <Link onClick={onClick} sx={{ "&:hover": { cursor: "pointer" } }}>
            <Typography>
              {type === "login" ? "Register" : "back to Login"}
            </Typography>
          </Link>
        </Box>
        {/* </form> */}
      </Box>
    </Box>
  );
};
export default memo(AuthCard);

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: "0 40px",
    margin: "0 40px",
    position: "relative",
    borderRadius: "35px",
    width: "80%",
    maxWidth: "400px",
    height: "650px",
    display: "flex",
    justifyContent: "center",
    boxShadow: "0px 10px 19px rgba(0, 0, 0, 0.16)",
    backgroundColor: "white",
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
    justifyContent: "center",
    gap: "40px",
    [theme.breakpoints.down("sm")]: {
      padding: "80px 0",
    },
  },
}));
