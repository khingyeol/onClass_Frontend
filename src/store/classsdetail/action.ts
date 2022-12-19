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

export enum ClassDetailActionType {
    UpdateClassId = "UPDATE_CLASS_ID",
}

export interface UpdateClassDetailAction {
    type: ClassDetailActionType.UpdateClassId;
    payload: ClassDetail;
}

export type ClassDetailAction = UpdateClassDetailAction;

export const updateClassDetail = (
    classDetail: ClassDetail
): UpdateClassDetailAction => {
    return {
        type: ClassDetailActionType.UpdateClassId,
        payload: classDetail,
    };
};
