import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { StageModel } from "./action";

const getState = (state: RootState): StageModel => state.stage;

export const getCurrentStage = createSelector([getState], (state: StageModel) => state.currentStage);
export const getSelectedType = createSelector([getState], (state: StageModel) => state.selectedType);
export const getSelectedId = createSelector([getState], (state: StageModel) => state.selectedId);