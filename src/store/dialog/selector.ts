import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { DialogInterface } from "./action";

const getState = (state: RootState): DialogInterface => state.dialog;

export const getDialogState = createSelector([getState], (state: DialogInterface) => state);