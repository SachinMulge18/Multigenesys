import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const employeeApi = createApi({
  reducerPath: "employeeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/",
  }),
  tagTypes: ["Employees"],
  endpoints: (builder) => ({
    getEmployee: builder.query({
      query: () => "employee",
      providesTags: ["Employees"],
    }),
  }),
});

export const { useGetEmployeeQuery } = employeeApi;
