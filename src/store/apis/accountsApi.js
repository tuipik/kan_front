import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API_BASE_URL } from "../../settings";
import { prepareHeaders } from "../../utils";

const accountsApi = createApi({
  reducerPath: 'accounts',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders,
  }),
  endpoints(builder) {
    return {
      fetchAccounts: builder.query({
        query: (params) => {
          return {
            url: 'accounts',
            method: 'GET',
            params: params
          }
        },
        provideTags: ['Accounts']
      })
    }
  }
});

export const {
  useFetchAccountsQuery,
} = accountsApi;

export {accountsApi};

