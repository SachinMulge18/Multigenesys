import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/",
  }),
  tagTypes: ["Employees", "Countries"],
  endpoints: () => ({}),
});