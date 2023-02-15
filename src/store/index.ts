import {
  AnyAction,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { classDetailReducer } from "./classsdetail/store";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { authenticationReducer } from "./authentication/store";
import { userDataReducer } from "./userdata/store";
import { stageReducer } from "./stage/store";
import { dialogReducer } from "./dialog/store";

const appReducer = combineReducers({
  authentication: authenticationReducer,
  classDetail: classDetailReducer,
  userData: userDataReducer,
  stage: stageReducer,
  dialog: dialogReducer,
});

const rootReducer = (state: RootState | undefined, action: AnyAction) => {
  return appReducer(action.type === 'LOGOUT' ? undefined : state, action);
};

export const clearStore = () => {
  return { type: 'LOGOUT'}
}

const persistedReducer = persistReducer(
    {
        key: 'rootReducer',
        storage
    }
    , rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof appReducer>;
