export interface StageModel {
  currentStage: string;
  selectedType?: string;
  selectedId?: string;
}

export enum AllStageType {
    HOME = 'HOME',
    CLASS = 'CLASS',
    POST = 'POST',
    EXAM = 'EXAM'
}

export enum StageActionType {
  UpdateCurrentStage = "STAGE/UPDATE_STAGE",
  UpdateSelectedType = "STAGE/UPDATE_SELECTED_TYPE",
  UpdateSelectedId = "STAGE/UPDATE_SELECTED_ID",
  ClearStage = "STAGE/CLEAR_STAGE",
}

export interface UpdateCurrentStageAction {
  type: StageActionType.UpdateCurrentStage;
  payload: { currentStage: string };
}

export interface UpdateSelectedTypeAction {
  type: StageActionType.UpdateSelectedType;
  payload: { selectedType: string };
}

export interface UpdateSelectedIdAction {
  type: StageActionType.UpdateSelectedId;
  payload: { selectedId: string };
}

export interface ClearStageAction {
  type: StageActionType.ClearStage;
}

export type StageAction =
  | UpdateCurrentStageAction
  | UpdateSelectedTypeAction
  | UpdateSelectedIdAction
  | ClearStageAction;

export const updateCurrentStage = (
  currentStage: string
): UpdateCurrentStageAction => {
  return {
    type: StageActionType.UpdateCurrentStage,
    payload: { currentStage },
  };
};

export const updateSelectedType = (
  selectedType: string
): UpdateSelectedTypeAction => {
  return {
    type: StageActionType.UpdateSelectedType,
    payload: { selectedType },
  };
};

export const updateSelectedId = (
  selectedId: string
): UpdateSelectedIdAction => {
  return {
    type: StageActionType.UpdateSelectedId,
    payload: { selectedId },
  };
};
