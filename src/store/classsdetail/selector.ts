import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { GetClassResponseData } from "../../services/types/getClassResponse";

const getState = (state: RootState): GetClassResponseData => state.classDetail;

export const getClassDetail = createSelector([getState], (state: GetClassResponseData) => state)
export const getClassId = createSelector([getState], (state: GetClassResponseData) => state.class_code);