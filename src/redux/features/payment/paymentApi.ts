import { baseApi } from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBuyerPayment: builder.query({
      query: () => ({
        url: "/payment/buyer-payment",
        methods: "GET",
      }),
    }),
  }),
});

export const { useGetBuyerPaymentQuery } = paymentApi;
