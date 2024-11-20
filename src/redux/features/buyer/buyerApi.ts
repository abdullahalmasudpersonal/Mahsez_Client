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
  }),
});

export const { useGetBuyersQuery } = buyerApi;
