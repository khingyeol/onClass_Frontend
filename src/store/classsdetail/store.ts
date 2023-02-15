import { Reducer } from 'react';
import { GetClassResponseData } from '../../services/types/getClassResponse';
import { ClassDetailActionType, ClassDetailAction } from './action';

const initialState: GetClassResponseData = {
  class_code: '',
  class_name: '',
  class_description: '',
  class_section: '',
  class_room: '',
  class_subject: '',
  teacher: [],
  student: [],
  class_assignment: [],
  class_post: [],
  class_exam: [],
  nickname: []
};

export const classDetailReducer: Reducer<GetClassResponseData, ClassDetailAction> = (
    state = initialState,
    action,
): GetClassResponseData => {
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