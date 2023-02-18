import {
  ClassFeedModel,
  GetClassResponseData,
} from "../../services/types/getClassResponse";

export enum ClassDetailActionType {
  UpdateClassDetail = "UPDATE_CLASS_DETAIL",
  UpdateClassFeed = "UPDATE_CLASS_FEED",
}

export interface UpdateClassDetailAction {
  type: ClassDetailActionType.UpdateClassDetail;
  payload: GetClassResponseData;
}

export interface UpdateClassFeedAction {
  type: ClassDetailActionType.UpdateClassFeed;
  payload: ClassFeedModel[];
}

export type ClassDetailAction = UpdateClassDetailAction | UpdateClassFeedAction;

export const updateClassDetail = (
  classDetail: GetClassResponseData
): UpdateClassDetailAction => {
  return {
    type: ClassDetailActionType.UpdateClassDetail,
    payload: classDetail,
  };
};

export const updateClassFeed = (
  classFeed: ClassFeedModel[]
): UpdateClassFeedAction => {
  return {
    type: ClassDetailActionType.UpdateClassFeed,
    payload: classFeed,
  };
};
