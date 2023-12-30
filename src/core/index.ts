import { PreloadedState, combineReducers, configureStore } from "@reduxjs/toolkit"
import { authApi } from "./api/authApi"
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import { reducer as userReducer } from "./slices/userSlice";
import { reducer as appReducer } from "./slices/appSlice"
/* import { socketMiddleware } from "./middleware" */

const middlewares = [/* socketMiddleware,  */authApi.middleware]

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  [authApi.reducerPath]: authApi.reducer,
})

export type RootReducerState = ReturnType<typeof rootReducer>;

export const setupStore = (
  preloadedState?: PreloadedState<RootReducerState>
) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(middlewares),
    preloadedState,
  });
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares),
})

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = AppStore["dispatch"];
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useDispatch = () => useReduxDispatch<AppDispatch>();
