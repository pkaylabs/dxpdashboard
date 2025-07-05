import { api } from "@/app/api/auth";

export const touristApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getTouristSites: builder.query({
      query: () => ({
        url: "/tourists/",
        method: "GET",
      }),
    }),
    createTouristSite: builder.mutation({
        query: (formData: FormData) => ({
            url: "/tourists/",
            method: "POST",
            body: formData,
        })
    }),
    deleteTouristSite: builder.mutation({
      query: (credentials) => ({
        url: `/tourists/`,
        method: "DELETE",
        body: {...credentials },
      }),
    })
  }),
});

export const { useGetTouristSitesQuery, useCreateTouristSiteMutation, useDeleteTouristSiteMutation } = touristApiSlice;
