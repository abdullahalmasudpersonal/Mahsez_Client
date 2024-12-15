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
    updateAdminOnlineStatus: builder.mutation({
      query: (userId) => ({
        url: "/admin/update-online-status",
        method: "PATCH",
        body: userId,
      }),
      invalidatesTags: [tagTypes.admin],
    }),
  }),
});

export const { useGetAdminsQuery, useUpdateAdminOnlineStatusMutation } =
  adminApi;
