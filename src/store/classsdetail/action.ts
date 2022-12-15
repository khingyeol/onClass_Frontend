export interface ClassDetail {
    classId?: string;
    className?: string;
    classTeacher?: string;
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
