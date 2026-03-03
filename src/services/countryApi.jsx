import { baseApi } from "../app/baseApi";

export const countryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCountries: builder.query({
      query: () => "country",
      providesTags: ["Countries"],
    }),
  }),
});

export const { useGetCountriesQuery } = countryApi;
