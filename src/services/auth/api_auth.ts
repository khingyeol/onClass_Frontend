import { server, api_auth } from "../constants";
import httpClient from "../httpClient";
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import UserPool from "../../cognito/UserPool";
import { useNavigate } from "react-router-dom";

//ap-southeast-1:68565b06-5fce-4229-ad8d-c4d20fb2ff7f

export interface onClassRegisterModel {
  username: string;
  password: string;
  email: string;
  name: {
    firstname: string;
    lastname: string;
  };
  optional_contact?: string;
  profile_pic: "61a4cb8ecbdaf9c5449507f3";
}

export interface cognitoUserDataModel {
  username: string;
  password: string;
}

export const register = async (values: onClassRegisterModel) => {
  const cognitoRegisterData = {
    username: values.username,
    password: values.password,
    email: values.email,
  };
  const emailAttribute = new AmazonCognitoIdentity.CognitoUserAttribute({
    Name: "email",
    Value: cognitoRegisterData.email,
  });

  const onClassRegisterData = {
    username: values.username,
    email: values.email,
    name: {
      firstname: values.name.firstname,
      lastname: values.name.lastname,
    },
    optional_contact: values.optional_contact,
    profile_pic: "61a4cb8ecbdaf9c5449507f3",
  };

  UserPool.signUp(
    cognitoRegisterData.username,
    cognitoRegisterData.password,
    [emailAttribute],
    [],
    async (err, result) => {
      if (err) {
        //err.message มาจาก cognito || lambda ถ้า domain ไม่ถูกจะสมัครไม่ได้
        alert(err.message || JSON.stringify(err));
        return;
      }
      var cognitoUser = result?.user;
      console.log("user name is " + cognitoUser?.getUsername());

      const res = await httpClient.post(
        server.AUTH_URL + api_auth.REGISTER_URL,
        onClassRegisterData
      );
      if (res.data.result === "OK") {
        return true;
      } else {
        return false;
      }
    }
  );
};

export const isLoggedIn = () => {
  let token = localStorage.getItem(server.TOKEN_KEY);
  console.log("token", token);
  return token != null;
}; //ถ้ามี return true

export const logout = () => {
  localStorage.removeItem(server.TOKEN_KEY);
};

export const login = async (values: cognitoUserDataModel) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();

  const cognitoUserData = {
    Username: values.username,
    Pool: UserPool,
  };

  const cognitoAuthenticationData = {
    Username: values.username,
    Password: values.password,
  };

  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    cognitoAuthenticationData
  );

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(cognitoUserData);

  //resend confirm code & confirm registeration need username. So, this should be store in redux.
  // cognitoUser.resendConfirmationCode({
  //   onFailure: (err) => {
  //     alert(err.message || JSON.stringify(err));
  //     return { auth: false, data: err.message };
  //   },
  //   onSuccess: () => {
  //     alert('Resend code');
  //     //Navigate
  //   },
  // });

  // cognitoUser.confirmRegistration('755610', false, {
  //   onFailure: (err) => {
  //     alert(err.message || JSON.stringify(err));
  //     return { auth: false, data: err.message };
  //   },
  //   onSuccess: () => {
  //     alert('Verify Success');
  //   },
  // })

  cognitoUser.authenticateUser(authenticationDetails, {
    onFailure: (err) => {
      console.log("cognitoUser onFailure", err.code);

      if (err.code === "UserNotConfirmedException") {
        console.log("EIEI");
        navigate("/otp");
        //Navigate to sendcode verify account
      }
      alert(err.message || JSON.stringify(err));
      return { auth: false, data: err.message };
    },
    onSuccess: async (result) => {
      const token = result.getAccessToken().getJwtToken();
      localStorage.setItem(server.TOKEN_KEY, token);
      const res = await httpClient.get(server.AUTH_URL + api_auth.LOGIN_URL);
      console.log("cognitoUser onSuccess");

      if (res.data.result === "OK") {
        console.log("Login Success");
        window.location.reload();
        //logged in
      } else {
        console.log("Login fail", res);
        console.log("Login fail");
        //fail
      }
    },
  });

  return { auth: false, data: "method failed" };
};
