import { api } from "@/app/api/auth";

export const hotelApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getHotels: builder.query({
      query: () => ({
        url: "/hotels/",
        method: "GET",
      }),
    }),
    addHotel: builder.mutation({
      query: (formData: FormData) => ({
        url: "/hotels/",
        method: "POST",
        body: formData,
      }),
    }),
    deleteHotel: builder.mutation({
      query: (credentials) => ({
        url: "/hotels/",
        method: "DELETE",
        body: { ...credentials },
      }),
    }),
  }),
});

export const {
  useGetHotelsQuery,
  useAddHotelMutation,
  useDeleteHotelMutation,
} = hotelApiSlice;
