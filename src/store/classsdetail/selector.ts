import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ClassDetail } from "./action";

const getState = (state: RootState): ClassDetail => state.classDetail;

export const getClassDetail = createSelector([getState], (state: ClassDetail) => state)
export const getClassId = createSelector([getState], (state: ClassDetail) => state.classId);