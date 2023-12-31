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
        query: (body) => {
          return {
            url: 'departments',
            method: 'POST',
            body
          }
        },
        invalidatesTags: ['Departments']
      }),
      updateDepartment: builder.mutation({
        query: (department) => {
          const departmentId = department.id
          const body = {...department};
          delete body.id;
          return {
            url: `departments/${departmentId}`,
            method: 'PATCH',
            body
          }
        },
        invalidatesTags: ['Departments']
      }),
      deleteDepartment: builder.mutation({
        query: (department) => {
          return {
            url: `departments/${department.id}`,
            method: 'DELETE'
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
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentsApi;

export {departmentsApi};