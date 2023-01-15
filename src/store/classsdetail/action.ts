import { GetAllClassResponseData } from "../../services/types/getAllClassResponse";

export enum ClassDetailActionType {
    UpdateClassDetail = "UPDATE_CLASS_DETAIL",
}

export interface UpdateClassDetailAction {
    type: ClassDetailActionType.UpdateClassDetail;
    payload: GetAllClassResponseData;
}

export type ClassDetailAction = UpdateClassDetailAction;

export const updateClassDetail = (
    classDetail: GetAllClassResponseData
): UpdateClassDetailAction => {
    return {
        type: ClassDetailActionType.UpdateClassDetail,
        payload: classDetail,
    };
};
