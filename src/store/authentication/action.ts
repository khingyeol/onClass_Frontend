export interface AuthenticationDetails {
  isAuthenticate: boolean;
}

export enum AuthenticationActionType {
  UpdateAuthentication = "UPDATE_AUTHENTICATION",
}

export interface UpdateAuthenticationAction {
  type: AuthenticationActionType.UpdateAuthentication;
  payload: { isAuthenticate: boolean };
}

export type AuthenticationAction = UpdateAuthenticationAction;

export const updateAuthentication = (
  isAuthenticate: boolean
): UpdateAuthenticationAction => {
  return {
    type: AuthenticationActionType.UpdateAuthentication,
    payload: { isAuthenticate },
  };
};
