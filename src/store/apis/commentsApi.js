import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API_BASE_URL } from "../../settings";
import { prepareHeaders } from "../../utils";

const commentsApi = createApi({
  reducerPath: 'comments',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders
  }),
  endpoints(builder) {
    return {
      fetchComments: builder.query({
        query: (taskId) => {
          return {
            url: 'comments',
            method: 'GET',
            params: { 'task__id': taskId }
          }
        },
        providesTags: ['Comments']
      }),
      createComment: builder.mutation({
        query: (data) => {
          return {
            url: 'comments',
            method: 'POST',
            body: data,
          }
        },
        invalidatesTags: (result, error) => error ? [] : ['Comments'],
      })
    }
  }
});

export const {
  useFetchCommentsQuery,
  useCreateCommentMutation,
} = commentsApi;

export { commentsApi };