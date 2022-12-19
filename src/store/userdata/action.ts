export interface UserNameModel {
  firstname: string;
  lastname: string;
}

export interface UserModel {
  username?: string;
  email?: string;
  profile_pic?: string;
  name?: UserNameModel;
  device_id?: string;
  state?: string;
}

export enum UserDataActionType {
  UpdateUserData = "USER/UPDATE_USERDATA",
  UpdateUserEmail = "USER/UPDATE_EMAIL",
  ClearUserData = "USER/CLEAR_USERDATA",
}

export interface UpdateUserDataAction {
  type: UserDataActionType.UpdateUserData;
  payload: UserModel;
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

export const updateUserEmail = (email: string): UpdateUserEmailAction => {
  return {
    type: UserDataActionType.UpdateUserEmail,
    payload: { email },
  };
};
