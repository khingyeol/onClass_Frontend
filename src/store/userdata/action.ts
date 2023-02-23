export interface UserNameModel {
  firstname: string;
  lastname: string;
}

export interface UserClassModel {
  role: string;
  class_code: string;
}

export interface UserModel {
  user_id?: string;
  username?: string;
  email?: string;
  profile_pic?: string;
  name?: UserNameModel;
  class?: [UserClassModel]
}

export enum UserDataActionType {
  UpdateUserData = "USER/UPDATE_USERDATA",
  UpdateUsername = "USER/UPDATE_USERNAME",
  UpdateUserEmail = "USER/UPDATE_EMAIL",
  ClearUserData = "USER/CLEAR_USERDATA",
}

export interface UpdateUserDataAction {
  type: UserDataActionType.UpdateUserData;
  payload: UserModel;
}

export interface UpdateUsernameAction {
  type: UserDataActionType.UpdateUsername;
  payload: { username: string };
}

export interface UpdateUserEmailAction {
  type: UserDataActionType.UpdateUserEmail;
  payload: { email: string };
}

export interface ClearUserDataAction {
  type: UserDataActionType.ClearUserData;
}

export type UserDataAction =
  | UpdateUserDataAction
  | UpdateUsernameAction
  | UpdateUserEmailAction
  | ClearUserDataAction;

export const updateUserData = (data: UserModel): UpdateUserDataAction => {
  return {
    type: UserDataActionType.UpdateUserData,
    payload: data,
  };
};

export const clearUserData = (): ClearUserDataAction => {
  return {
    type: UserDataActionType.ClearUserData,
  };
};

export const updateUsername = (username: string): UpdateUsernameAction => {
  return {
    type: UserDataActionType.UpdateUsername,
    payload: { username },
  };
};

export const updateUserEmail = (email: string): UpdateUserEmailAction => {
  return {
    type: UserDataActionType.UpdateUserEmail,
    payload: { email },
  };
};
