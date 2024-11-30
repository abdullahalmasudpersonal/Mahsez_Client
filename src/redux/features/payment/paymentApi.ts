import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../tagTypes";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBuyerPayment: builder.query({
      query: () => ({
        url: "/payment/buyer-payment",
        methods: "GET",
      }),
      providesTags: [tagTypes.payment],
    }),
    initPayment: builder.mutation({
      query: (orderId) => ({
        url: `/payment/init-payment/${orderId}`,
        method: "POST",
      }),
      invalidatesTags: [tagTypes.payment],
    }),
  }),
});

export const { useInitPaymentMutation, useGetBuyerPaymentQuery } = paymentApi;
