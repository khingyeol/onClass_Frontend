import { Reducer } from 'react';
import { StageAction, StageActionType, StageModel } from './action';

const initialState: StageModel = {
    currentStage: 'HOME'
}

export const stageReducer: Reducer<StageModel, StageAction> = (state = initialState, action): StageModel => {
    switch (action.type) {
        case StageActionType.UpdateCurrentStage: {
            return { ...state, currentStage: action.payload.currentStage };
        }
        case StageActionType.UpdateSelectedType: {
            return { ...state, selectedType: action.payload.selectedType };
        }
        case StageActionType.UpdateSelectedId: {
            return { ...state, selectedId: action.payload.selectedId };
        }
        default: {
            return state;
        }
    }
}