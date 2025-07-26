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
    updateUser: builder.mutation({
      query: (formData: FormData) => ({
        url: "/users/",
        method: "PUT",
        body: formData,
      }),
    }),
    deleteUser: builder.mutation({
      query: (credentials) => ({
        url: "/users/",
        method: "DELETE",
        body: { ...credentials },
      }),
    }),
    getUserProfile: builder.query({
      query: () => ({
        url: "/userprofile/",
        method: "GET",
      }),
    }),
    updateProfile: builder.mutation({
      query: (formData: FormData) => ({
        url: "/userprofile/",
        method: "PUT",
        body: formData,
      }),
    }),
    changePassword: builder.mutation({
      query: (credentials) => ({
        url: "/changepassword/",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    accountDeletion: builder.mutation({
      query: () => ({
        url: "/accountdeletion/",
        method: "POST",
        // body: { ...credentials },
      })
    })
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useGetUserProfileQuery,
  useUpdateProfileMutation,
  useDeleteUserMutation,
  useChangePasswordMutation,
  useUpdateUserMutation,
  useAccountDeletionMutation,
} = usersApiSlice;
