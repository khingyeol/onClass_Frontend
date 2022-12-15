import { Reducer } from 'react';
import { ClassDetail, ClassDetailActionType, ClassDetailAction } from './action';

const initialState: ClassDetail = {};

export const classDetailReducer: Reducer<ClassDetail, ClassDetailAction> = (
    state = initialState,
    action,
): ClassDetail => {
    switch (action.type) {
        case ClassDetailActionType.UpdateClassId: {
            return { ...state, classId: action.payload.classId };
        }
        default: {
            return state;
        }
    }
}