import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./data";

export const tagTypes = [
  "user",
  "staff",
  "customer",
  "org-config",
  "survey",
] as const;

const envUrl = import.meta.env.VITE_API_URL;
const defaultUrl =
  "http://miro-sm-env.eba-yevmzjb3.us-west-2.elasticbeanstalk.com/";

export const baseUrl = (envUrl || defaultUrl).replace(
  /\blocalhost\b/,
  window.location.hostname
);

export const api = createApi({
  reducerPath: "api",
  tagTypes,
  endpoints: () => ({}),
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders(headers, { getState }) {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    },
  }),
});
