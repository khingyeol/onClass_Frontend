import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { UserModel } from "./action";

const getState = (state: RootState): UserModel => state.userData;

export const getUserData = createSelector([getState], (state: UserModel) => state);
export const getUsername = createSelector([getState], (state: UserModel) => state.username);
export const getUserEmail = createSelector([getState], (state: UserModel) => state.email);