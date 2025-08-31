import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../tagTypes";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    crateAdmin: builder.mutation({
      query: (adminInfo) => ({
        url: "/user/create-admin",
        method: "POST",
        body: adminInfo,
      }),
      invalidatesTags: [tagTypes.admin],
    }),
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

export const { useCrateAdminMutation,useGetAdminsQuery, useUpdateAdminOnlineStatusMutation } =
  adminApi;
