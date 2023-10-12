import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../settings";
import { prepareHeaders } from "../../utils";

const tasksApi = createApi({
  reducerPath: 'tasks',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders,
  }),
  endpoints(builder) {
    return {
      fetchTasks: builder.query({
        query: () => {
          return {
            url: 'tasks',
            method: 'GET',
          }
        },
        providesTags: ['Tasks']
      }),
      createTask: builder.mutation({
        query: (data) => {
          return {
            url: 'tasks',
            method: 'POST',
            body: data,
          } 
        },
        invalidatesTags: (result, error) => error ? [] : ['Tasks'],
      }),
      updateTask: builder.mutation({
        query: ({taskId, updatedFields}) => {
          return {
            url: `tasks/${taskId}`,
            method: 'PATCH',
            body: updatedFields
          } 
        },
        invalidatesTags: (result, error) => error ? [] : ['Tasks', 'Comments'],
      }),
      deleteTask: builder.mutation({
        query: ( task ) => {
          return {
            url: `tasks/${task.id}`,
            method: 'DELETE',
          }
        },
        invalidatesTags: (result, error) => error ? [] : ['Tasks'],
      }),
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
      }),
      deleteComment: builder.mutation({
        query: ( comment ) => {
          return {
            url: `comments/${comment.id}`,
            method: 'DELETE',
          }
        },
        invalidatesTags: (result, error) => error ? [] : ['Comments'],
      }),

    }
  }
});

export const {
  useFetchTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useFetchCommentsQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
} = tasksApi;

export { tasksApi };