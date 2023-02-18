import { Reducer } from 'react';
import { UserDataAction, UserDataActionType, UserModel } from './action';


const initialState: UserModel = {}

export const userDataReducer: Reducer<UserModel, UserDataAction> = (
    state = initialState,
    action,
): UserModel => {
    switch (action.type) {
        case UserDataActionType.UpdateUserData: {
            return { ...action.payload }
        }
        case UserDataActionType.UpdateUserEmail: {
            return { ...state, email: action.payload.email};
        }
        default: {
            return state;
        }
    }
}