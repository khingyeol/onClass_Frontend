import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { UserModel } from "./action";

const getState = (state: RootState): UserModel => state.userData;

export const getUserEmail = createSelector([getState], (state: UserModel) => state.email);