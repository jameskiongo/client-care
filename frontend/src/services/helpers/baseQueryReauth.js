import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import { redirect } from "react-router-dom";

const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: "http://127.0.0.1:8000/api/",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
const baseQueryWithReauth = async (args, api, extraOptions) => {
  await pause(100);
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          {
            url: "/auth/token/refresh/",
            method: "POST",
            body: { refresh: localStorage.getItem("refreshToken") },
          },
          api,
          extraOptions,
        );
        if (refreshResult.data) {
          localStorage.setItem("accessToken", refreshResult.data.access);
          result = await baseQuery(args, api, extraOptions);
        } else {
          localStorage.removeItem("accessToken");
          return redirect("/login");
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};
export default baseQueryWithReauth;
