import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi, useLoginMutation } from "./apis/users";
import {
  useGetAllProgramsQuery,
  programsApi,
  useGetProgramByIdQuery,
} from "./apis/programs";
import {
  enrollApi,
  useEnrollPatientToProgramMutation,
} from "./apis/enrollment";
import {
  patientsApi,
  useGetAllPatientsQuery,
  useGetPatientByIdQuery,
  useAddPatientMutation,
} from "./apis/patients";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [enrollApi.reducerPath]: enrollApi.reducer,
    [programsApi.reducerPath]: programsApi.reducer,
    [patientsApi.reducerPath]: patientsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(patientsApi.middleware)
      .concat(enrollApi.middleware)
      .concat(programsApi.middleware),
});
setupListeners(store.dispatch);
export {
  useLoginMutation,
  useGetAllProgramsQuery,
  useGetProgramByIdQuery,
  useGetAllPatientsQuery,
  useGetPatientByIdQuery,
  useEnrollPatientToProgramMutation,
  useAddPatientMutation,
};
