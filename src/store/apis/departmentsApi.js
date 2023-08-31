import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {API_BASE_URL} from "../../settings";
import {prepareHeaders} from "../../utils";

const departmentsApi = createApi({
  reducerPath: 'departments',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders
  }),
  endpoints(builder) {
    return {
      fetchDepartments: builder.query({
        query: () => {
          return {
            url: 'departments',
            method: 'GET'
          }
        },
        providesTags: ['Departments']
      }),
      createDepartment: builder.mutation({
        query: (name) => {
          return {
            url: 'departments',
            method: 'POST',
            body: {name}
          }
        },
        invalidatesTags: ['Departments']
      })
    }
  }
});

export const {
  useFetchDepartmentsQuery,
  useCreateDepartmentMutation,
} = departmentsApi;

export {departmentsApi};