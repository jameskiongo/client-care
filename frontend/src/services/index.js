import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi, useLoginMutation } from "./apis/users";
import { useGetAllProgramsQuery, programsApi } from "./apis/programs";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [programsApi.reducerPath]: programsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(programsApi.middleware),
});
setupListeners(store.dispatch);
export { useLoginMutation, useGetAllProgramsQuery };
