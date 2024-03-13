import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/theme/themeSlice";
import kanbanReducer from "./features/kanban/kanbanSlice";
import contextReducer from "./features/auth/authSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      themeColor: themeReducer,
      kanban: kanbanReducer,
      context: contextReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
