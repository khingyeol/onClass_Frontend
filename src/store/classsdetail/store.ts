import { Reducer } from 'react';
import { ClassDetailActionType, ClassDetailAction } from './action';

export interface ClassDetail {
    class_code?: string;
    class_name?: string;
    class_section?: string;
    teacher?: {
      profile_pic?: string;
      name: {
        firstname: string;
        lastname: string;
      };
    };
  }
const initialState: ClassDetail = {};

export const classDetailReducer: Reducer<ClassDetail, ClassDetailAction> = (
    state = initialState,
    action,
): ClassDetail => {
    switch (action.type) {
      // case ClassDetailActionType
        case ClassDetailActionType.UpdateClassDetail: {
            return { ...action.payload };
        }
        default: {
            return state;
        }
    }
}