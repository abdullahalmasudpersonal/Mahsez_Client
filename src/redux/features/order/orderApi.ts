import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/order/create-order",
        method: "POST",
        body: orderData,
      }),
    }),
    getBuyerOrder: builder.query({
      query: () => ({
        url: "/order/buyer-order",
        method: "GET",
      }),
    }),
    getAllOrder: builder.query({
      query: () => ({
        url: "/order",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetBuyerOrderQuery,
  useGetAllOrderQuery,
} = orderApi;
