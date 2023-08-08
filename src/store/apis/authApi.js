import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../settings';
// import { setAuth } from '../../store';


const authApi = createApi({
  reducerPath: 'auth2',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints(builder) {
    return {

      login: builder.mutation({
        query: (loginRequest) => {
          return {
            url: 'accounts/login',
            method: 'POST',
            body: {
              username: loginRequest.login,
              password: loginRequest.password
            }
          };

        },
        async onQueryStarted(args, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            debugger;
            console.log(1)
          } catch (error) {
            console.log(error);
          }
        }
      })
    };
  }
});

// export const {
//   useLoginMutation,
// } = authApi;

export { authApi };