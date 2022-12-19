import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { AuthenticationDetails } from './action';

const getState = (state: RootState): AuthenticationDetails => state.authentication;

export const getIsAuthenticate = createSelector([getState], (state: AuthenticationDetails) => state.isAuthenticate);