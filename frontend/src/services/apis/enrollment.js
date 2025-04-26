import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "../helpers/baseQueryReauth";

const enrollApi = createApi({
  reducerPath: "enrollApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Enrollments"], // Define tag type
  endpoints: (builder) => ({
    enrollPatientToProgram: builder.mutation({
      query: (data) => ({
        url: "enroll/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Enrollments"], // Invalidate this tag on success
    }),
  }),
});
export const { useEnrollPatientToProgramMutation } = enrollApi;
export { enrollApi };
