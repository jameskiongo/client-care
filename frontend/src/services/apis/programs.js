import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../helpers/baseQueryReauth";

const programsApi = createApi({
  reducerPath: "programsApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllPrograms: builder.query({
      query: () => ({
        url: "programs/",
        method: "GET",
      }),
    }),
    getProgramById: builder.query({
      query: (id) => ({
        url: `programs/program/${id}/`,
        method: "GET",
      }),
    }),
    createProgram: builder.mutation({
      query: (data) => ({
        url: "programs/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { useGetAllProgramsQuery } = programsApi;
export { programsApi };
