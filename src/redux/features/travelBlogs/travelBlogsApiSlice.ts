import { api } from "@/app/api/auth";

export const travelBlogsApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getTravelBlogs: builder.query({
      query: () => ({
        url: "/blogs/",
        method: "GET",
      }),
    }),
    createTravelBlog: builder.mutation({
      query: (formData: FormData) => ({
        url: "/blogs/",
        method: "POST",
        body: formData,
      }),
    }),
    deleteTravelBlog: builder.mutation({
      query: (credentials) => ({
        url: "/blogs/",
        method: "DELETE",
        body: { ...credentials },
      }),
    }),
  }),
});

export const {
  useGetTravelBlogsQuery,
  useCreateTravelBlogMutation,
  useDeleteTravelBlogMutation,
} = travelBlogsApiSlice;
