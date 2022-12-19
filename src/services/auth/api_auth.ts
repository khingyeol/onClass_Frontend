import { server, api_auth } from "../constants";
import httpClient from "../httpClient";
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import UserPool from "../../cognito/UserPool";
import { updateAuthentication } from "../../store/authentication/action";
import { store } from "../../store";

let currentUser: AmazonCognitoIdentity.CognitoUser | null =
  UserPool.getCurrentUser();

function getCognitoUser(username: string) {
  const cognitoUserData = {
    Username: username,
    Pool: UserPool,
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(cognitoUserData);

  return cognitoUser;
}

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
        // navigate("/otp");
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
  const cognitoUser = UserPool.getCurrentUser();

  cognitoUser?.signOut();
  // dispatch(updateAuthentication(false))
  store.dispatch(updateAuthentication(false));
  window.localStorage.clear();
  localStorage.removeItem(server.TOKEN_KEY);
  window.location.reload();
};

export async function signIn(username: string, password: string) {
  return new Promise(function (resolve, reject) {
    const cognitoAuthenticationData = {
      Username: username,
      Password: password,
    };
    const authenticationDetails =
      new AmazonCognitoIdentity.AuthenticationDetails(
        cognitoAuthenticationData
      );

    currentUser = getCognitoUser(username);
    currentUser.authenticateUser(authenticationDetails, {
      onSuccess: async (result) => {
        const token = result.getAccessToken().getJwtToken();
        localStorage.setItem(server.TOKEN_KEY, token);
        const res = await httpClient.get(server.AUTH_URL + api_auth.LOGIN_URL);
        if (res.data.result === "OK") {
          console.log("[Login] Success", res);
          window.location.reload();
          resolve(result);
        } else {
          console.log("[Login] fail", res);
          console.log("Login fail");
          reject(`Login fail ${res.statusText}`);
        }
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  }).catch((err) => {
    throw err;
  });
}

export async function signUp(values: onClassRegisterModel) {
  return new Promise(function (resolve, reject) {
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
          reject(err);
        } else {
          var cognitoUser = result?.user;
          console.log("user name is " + cognitoUser?.getUsername());

          const res = await httpClient.post(
            server.AUTH_URL + api_auth.REGISTER_URL,
            onClassRegisterData
          );
          if (res.data.result === "OK") {
            // navigate("/otp");
            resolve(result);
          } else {
            reject("error BE");
          }
        }
      }
    );
  });
}

export const login = async (values: cognitoUserDataModel) => {
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
        cognitoUser.resendConfirmationCode((error) => {
          if (error) throw error;
        });
        // alert("Confirm resendConfirmationCode");
        // navigate("/otp");
        // return { code: "102" }
        //Navigate to sendcode verify account
      } else {
        alert(err.message || JSON.stringify(err));
        return { code: "404", auth: false, data: err.message };
      }
    },
    onSuccess: async (result) => {
      const token = result.getAccessToken().getJwtToken();
      localStorage.setItem(server.TOKEN_KEY, token);
      const res = await httpClient.get(server.AUTH_URL + api_auth.LOGIN_URL);
      console.log("cognitoUser onSuccess");

      if (res.data.result === "OK") {
        console.log("Login Success");
        window.location.reload();
        return { code: "200" };
        //logged in
      } else {
        console.log("Login fail", res);
        console.log("Login fail");
        return { code: "400" };
        //fail
      }
    },
  });

  // return { auth: false, data: "method failed" };
};

// export const sendOTP = async(email: string) => {
//   const cognitoUser = getCognitoUser(email)
//   if (!cognitoUser) {
//     return { code: "400", message: `could not find user: ${email}`}
//   }
//   // cognitoUser.code

// }

export const confirmOTP = async (email: string, otp: string) => {
  const cognitoUser = getCognitoUser(email);
  cognitoUser.confirmRegistration(otp, false, (error: Error | null, result) => {
    if (error) {
      throw error;
      // return {code: '400'}
    } else {
      console.log("ConfirmRegistration !");
      return { code: "200" };
    }
    // alert("Confirm Registration");
  });
  // resend confirm code & confirm registeration need username. So, this should be store in redux.
};
