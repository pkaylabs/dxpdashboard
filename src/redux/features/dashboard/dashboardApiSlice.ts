import { api } from "@/app/api/auth";

export const dashboardApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query({
      query: () => ({
        url: "/dashboard/",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDashboardDataQuery } = dashboardApiSlice;
