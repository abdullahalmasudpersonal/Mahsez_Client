import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../tagTypes";

const buyerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBuyers: builder.query({
      query: () => ({
        url: "/buyer",
        method: "GET",
      }),
      providesTags: [tagTypes.buyer],
    }),
    deleteBuyer: builder.mutation({
      query: (id) => ({
        url: `/buyer/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.buyer],
    }),
    updateBuyerOnlineStatus: builder.mutation({
      query: (userId) => ({
        url: "/buyer/update-online-status",
        method: "PATCH",
        body: userId,
      }),
      invalidatesTags: [tagTypes.buyer],
    }),
  }),
});

export const {
  useGetBuyersQuery,
  useDeleteBuyerMutation,
  useUpdateBuyerOnlineStatusMutation,
} = buyerApi;
