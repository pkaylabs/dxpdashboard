import { api } from "@/app/api/auth";

export const politicalSitesApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getPoliticalSites: builder.query({
      query: () => ({
        url: "/political/",
        method: "GET",
      }),
    }),
    createPoliticalSite: builder.mutation({
      query: (formData: FormData) => ({
        url: "/political/",
        method: "POST",
        body: formData,
      }),
    }),
    deletePoliticalSite: builder.mutation({
      query: (credentials) => ({
        url: `/political/`,
        method: "DELETE",
        body: { ...credentials },
      }),
    }),
  }),
});

export const {
  useGetPoliticalSitesQuery,
  useCreatePoliticalSiteMutation,
  useDeletePoliticalSiteMutation,
} = politicalSitesApiSlice;
