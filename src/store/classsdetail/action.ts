import { GetClassResponseData } from "../../services/types/getClassResponse";

export enum ClassDetailActionType {
    UpdateClassDetail = "UPDATE_CLASS_DETAIL",
}

export interface UpdateClassDetailAction {
    type: ClassDetailActionType.UpdateClassDetail;
    payload: GetClassResponseData;
}

export type ClassDetailAction = UpdateClassDetailAction;

export const updateClassDetail = (
    classDetail: GetClassResponseData
): UpdateClassDetailAction => {
    return {
        type: ClassDetailActionType.UpdateClassDetail,
        payload: classDetail,
    };
};
