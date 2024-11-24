import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../tagTypes";

const buyerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBuyers: builder.query({
      query: () => ({
        url: "/buyer",
        method: "GET",
      }),
    }),
    deleteBuyer: builder.mutation({
      query: (id) => ({
        url: `/buyer/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.buyer],
    }),
  }),
});

export const { useGetBuyersQuery, useDeleteBuyerMutation } = buyerApi;
