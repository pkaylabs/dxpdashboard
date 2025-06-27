import { api } from "@/app/api/auth";

export const usersApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/users/",
        method: "GET",
      }),
    }),
    createUser: builder.mutation({
      query: (credentials) => ({
        url: "/users/",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useGetUsersQuery, useCreateUserMutation } = usersApiSlice;
