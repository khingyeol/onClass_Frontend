import { Reducer } from 'react';
import { DialogAction, DialogActionType, DialogInterface } from './action';

const initialState: DialogInterface = {
    id: '',
    isShow: false,
    title: ''
}

export const dialogReducer: Reducer<DialogInterface, DialogAction> = (
    state = initialState, action
) => {
    switch (action.type) {
        case DialogActionType.DisplayDialog:
            return { ...action.payload, isShow: true };
        case DialogActionType.HideDialog:
            return { ...state, isShow: false };
        default: {
            return state;
        }
    }
}