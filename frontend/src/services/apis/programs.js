import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../helpers/baseQueryReauth";

const programsApi = createApi({
  reducerPath: "programsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Programs"],
  endpoints: (builder) => ({
    getAllPrograms: builder.query({
      query: () => ({
        url: "programs/",
        method: "GET",
      }),
      providesTags: ["Programs"],
    }),
    getProgramById: builder.query({
      query: (program_id) => ({
        url: `programs/program/${program_id}/`,
        method: "GET",
      }),
      providesTags: (result, error, arg) =>
        result ? [{ type: "Programs", id: arg }] : ["Programs"],
    }),
    createProgram: builder.mutation({
      query: (data) => ({
        url: "programs/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Programs"],
    }),
  }),
});

export const {
  useGetAllProgramsQuery,
  useGetProgramByIdQuery,
  useCreateProgramMutation,
} = programsApi;
export { programsApi };
