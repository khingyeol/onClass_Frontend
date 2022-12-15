import { Button, Link, TextField, Theme, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { FC, memo, useState } from "react";
import { makeStyles } from "@mui/styles";
import OCButton from "../../common/OCButton";
import OCTextfield from "../../common/OCTextfield";
import { login, register } from "../../services/auth/api_auth";
import {
  cognitoUserDataModel,
  onClassRegisterModel,
} from "../../services/auth/api_auth";

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

interface AuthCardProps {
  type: "login" | "register";
  onClick: (event: any) => void;
}

const AuthCard: FC<AuthCardProps> = (props) => {
  const classes = useStyles();
  const [loginTF, setLoginTF] = useState<cognitoUserDataModel>();
  const [registerTF, setRegisterTF] = useState<onClassRegisterModel>({
    username: "",
    password: "",
    email: "",
    name: {
      firstname: "",
      lastname: "",
    },
    profile_pic: "61a4cb8ecbdaf9c5449507f3",
  });
  // const [registerTF, setRegisterTF] = useState({});

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

        default:
          setRegisterTF({
            ...registerTF,
            [e.target.name]: e.target.value,
          });
      }
    }
  };

  const onTappedLogin = async () => {
    // e.preventDefault();
    if (type === "login") {
      const res = await login(loginTF!);
      console.log("[onTappedLogin] login", loginTF);
    } else {
      const res = await register(registerTF!);
      console.log("[onTappedLogin] regis", loginTF);
    }
    // if (res.auth) {
    //   //res.auth ว่ามี tokenมั้ย
    //   console.log("[onTappedLogin] pass", res.data);
    //   // window.location.reload();
    // } else {
    //   console.log("[onTappedLogin] err", res.data);
    // }
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.content}>
        <Typography variant="h1">
          {type === "login" ? "Login" : "Register"}
        </Typography>

        {type === "login" ? (
          <div style={{ display: "grid", gap: "17px" }}>
            <form>
              <OCTextfield
                name="username"
                value={loginTF?.username}
                onChange={(e) => handleChange(e)}
                label={"Username"}
                fullWidth
              />
              <OCTextfield
                name="password"
                type="password"
                value={loginTF?.password}
                onChange={(e) => handleChange(e)}
                label={"Password"}
                fullWidth
              />
            </form>
          </div>
        ) : (
          // <Box display={{xs:"flexbox", sm:"grid"}}>
          <form>
            <Box display="flex" flexDirection="column" gap="12px">
              <div style={{ display: "flex", gap: "17px" }}>
                <OCTextfield
                  name="username"
                  value={registerTF?.username}
                  onChange={(e) => handleChange(e)}
                  label={"Username"}
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
                <OCTextfield type="password" label={"Confirm Password"} />
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
                label={"Contact (optional)"}
              />
            </Box>
          </form>
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
            label={"submit"}
            onClick={() => onTappedLogin()}
          />
          <Link onClick={onClick} sx={{ "&:hover": { cursor: "pointer" } }}>
            {type === "login" ? "Register" : "back to Login"}
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
export default memo(AuthCard);
