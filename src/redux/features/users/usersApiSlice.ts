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
      query: (formData: FormData) => ({
        url: "/users/",
        method: "POST",
        body: formData,
      }),
    }),
    deleteUser: builder.mutation({
      query: (credentials) => ({
        url: "/users/",
        method: "DELETE",
        body: {...credentials}
      })
    }),
    getUserProfile: builder.query({
      query: () => ({
        url: "/userprofile/",
        method: "GET",
      }),
    }),
    updateProfile: builder.mutation({
      query: (credentials) => ({
        url: "/userprofile/",
        method: "PUT",
        body: { ...credentials },
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useGetUserProfileQuery,
  useUpdateProfileMutation,
  useDeleteUserMutation
} = usersApiSlice;
