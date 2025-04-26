import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../helpers/baseQueryReauth";

const patientsApi = createApi({
  reducerPath: "patientsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Patients"], // Define the tag type
  endpoints: (builder) => ({
    getAllPatients: builder.query({
      query: () => ({
        url: "clients/",
        method: "GET",
      }),
      providesTags: ["Patients"], // This query provides 'Patients' tag
    }),
    getPatientById: builder.query({
      query: (client_id) => ({
        url: `clients/client/${client_id}/`,
        method: "GET",
      }),
      providesTags: (result, error, arg) =>
        result ? [{ type: "Patients", id: arg }] : ["Patients"],
    }),
    addPatient: builder.mutation({
      query: (data) => ({
        url: "clients/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Patients"], // This mutation invalidates 'Patients' tag
    }),
    searchPatients: builder.query({
      query: (searchTerm) => ({
        url: `clients?search=${searchTerm}`,
        method: "GET",
      }),
      providesTags: ["Patients"], // This query provides 'Patients' tag
    }),
  }),
});

export const {
  useGetAllPatientsQuery,
  useGetPatientByIdQuery,
  useAddPatientMutation,
  useSearchPatientsQuery,
} = patientsApi;
export { patientsApi };
