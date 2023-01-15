import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { GetAllClassResponseData } from "../../services/types/getAllClassResponse";

const getState = (state: RootState): GetAllClassResponseData => state.classDetail;

export const getClassDetail = createSelector([getState], (state: GetAllClassResponseData) => state)
export const getClassId = createSelector([getState], (state: GetAllClassResponseData) => state.class_code);