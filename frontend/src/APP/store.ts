import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import houseReducer from "./features/houseSlice";

const rootReducer = combineReducers({
  user: userReducer,
  houses: houseReducer,
});
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};
const persistedReduce = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReduce,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
