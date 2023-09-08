import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {API_BASE_URL} from "../../settings";
import {prepareHeaders} from "../../utils";

const settingsApi = createApi({
  reducerPath: 'settings',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders,
  }),
  endpoints(builder) {
    return {
      fetchSettings: builder.query({
        query: () => {
          return {
            url: 'defaults',
            method: 'GET'
          }
        }
      })
    }
  }
});

export const {
  useFetchSettingsQuery,
} = settingsApi;

export { settingsApi };
