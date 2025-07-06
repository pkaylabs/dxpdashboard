import { api } from "@/app/api/auth";

export const notificationApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => ({
        url: "/notifications/",
        method: "GET",
      }),
    }),
    addNotifications: builder.mutation({
      query: (credentials) => ({
        url: "/notifications/",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    updateNotifications: builder.mutation({
      query: (credentials) => ({
        url: "/notifications/",
        method: "PUT",
        body: {...credentials}
      })
    }),
    deleteNotification: builder.mutation({
      query: (credentials) => ({
        url: "/notifications/",
        method: "DELETE",
        body: { ...credentials },
      }),
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useAddNotificationsMutation,
  useDeleteNotificationMutation,
  useUpdateNotificationsMutation
} = notificationApiSlice;
