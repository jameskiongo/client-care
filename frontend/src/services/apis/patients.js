import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../helpers/baseQueryReauth";

const patientsApi = createApi({
  reducerPath: "patientsApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllPatients: builder.query({
      query: () => ({
        url: "clients/",
        method: "GET",
      }),
    }),
    getPatientById: builder.query({
      query: (client_id) => ({
        url: `clients/client/${client_id}/`,
        method: "GET",
      }),
    }),
    createProgram: builder.mutation({
      query: (data) => ({
        url: "clients/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { useGetAllPatientsQuery, useGetPatientByIdQuery } = patientsApi;
export { patientsApi };
