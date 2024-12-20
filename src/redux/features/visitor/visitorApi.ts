import { baseApi } from "../../api/baseApi";

const visitorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVisitorsWithFilters: builder.query({
      query: ({ searchTerm, limit, page, sort, ip }) => ({
        url: "/visitor",
        method: "GET",
        params: {
          ...(searchTerm && { searchTerm }),
          ...(limit && { limit }),
          ...(page && { page }),
          ...(sort && { sort }),
          ...(ip && { ip }),
        },
      }),
    }),
  }),
});

export const { useGetVisitorsWithFiltersQuery } = visitorApi;
