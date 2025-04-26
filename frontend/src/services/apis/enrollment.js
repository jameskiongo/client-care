import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../helpers/baseQueryReauth";

const enrollApi = createApi({
  reducerPath: "enrollApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    enrollPatientToProgram: builder.mutation({
      query: (data) => ({
        url: "enroll/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { useEnrollPatientToProgramMutation } = enrollApi;
export { enrollApi };
