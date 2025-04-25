import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};
const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api/auth/",
    fetchFn: async (...args) => {
      await pause(1000); // Pause for 1 second (1000ms)
      return fetch(...args);
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "login/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { useLoginMutation } = userApi;
export { userApi };
