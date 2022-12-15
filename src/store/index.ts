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

const appReducer = combineReducers({
  classDetail: classDetailReducer,
});

// const rootReducer = (state: RootState | undefined, action: AnyAction) => {
//   return appReducer(state, action);
// };

// const persistConfig = {
//   key: "root",
//   storage,
// };

const persistedReducer = persistReducer(
    {
        key: 'root',
        storage
    }
    , appReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof appReducer>;

// export type DispatchType<T = RootState> = ThunkDispatch<T, never, AnyAction>;
