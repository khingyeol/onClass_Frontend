import {
  AnyAction,
  combineReducers,
  configureStore,
  Reducer,
} from "@reduxjs/toolkit";
import { classDetailReducer } from "./classsdetail/store";
import thunk, { ThunkDispatch } from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { authenticationReducer } from "./authentication/store";
import { userDataReducer } from "./userdata/store";

const appReducer = combineReducers({
  authentication: authenticationReducer,
  classDetail: classDetailReducer,
  userData: userDataReducer,
});

const rootReducer = (state: RootState | undefined, action: AnyAction) => {
  return appReducer(action.type === 'LOGOUT' ? undefined : state, action);
};


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
