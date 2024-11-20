import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../tagTypes";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdmins: builder.query({
      query: () => ({
        url: "/admin",
        method: "GET",
      }),
      providesTags: [tagTypes.admin],
    }),
  }),
});

export const { useGetAdminsQuery } = adminApi;
