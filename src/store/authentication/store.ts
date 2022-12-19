import { Reducer } from 'react';
import { AuthenticationDetails, AuthenticationActionType, AuthenticationAction } from './action';

const initialState: AuthenticationDetails = {
    isAuthenticate: false,
};

export const authenticationReducer: Reducer<AuthenticationDetails, AuthenticationAction> = (
    state = initialState,
    action,
): AuthenticationDetails => {
    switch (action.type) {
        case AuthenticationActionType.UpdateAuthentication: {
            return { ...state, isAuthenticate: action.payload.isAuthenticate };
        }
        default: {
            return state;
        }
    }
}