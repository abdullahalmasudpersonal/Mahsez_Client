import { baseApi } from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    initPayment: builder.mutation({
      query: (orderId) => ({
        url: `/payment/init-payment/${orderId}`,
        method: "POST",
      }),
    }),
    getBuyerPayment: builder.query({
      query: () => ({
        url: "/payment/buyer-payment",
        methods: "GET",
      }),
    }),
  }),
});

export const { useInitPaymentMutation, useGetBuyerPaymentQuery } = paymentApi;
