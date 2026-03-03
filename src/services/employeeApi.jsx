import { baseApi } from "../app/baseApi";

export const employeeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEmployee: builder.query({
      query: () => "employee",
      providesTags: ["Employees"],
    }),
    getEmployeeById: builder.query({
      query: (id) => `employee/${id}`,
    }),

    createEmployee: builder.mutation({
      query: (data) => ({
        url: "employee",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Employees"],
    }),

    updateEmployee: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `employee/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Employees"],
    }),

    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `employee/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employees"],
    }),
  }),
});

export const {
  useGetEmployeeQuery,
  useGetEmployeeByIdQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApi;
