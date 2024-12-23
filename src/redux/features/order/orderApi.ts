import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../tagTypes";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/order/create-order",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: [tagTypes.order, tagTypes.product],
    }),
    getBuyerOrder: builder.query({
      query: () => ({
        url: "/order/buyer-order",
        method: "GET",
      }),
      providesTags: [tagTypes.order],
    }),
    getAllOrder: builder.query({
      query: () => ({
        url: "/order",
        method: "GET",
      }),
      providesTags: [tagTypes.order],
    }),
    getSingleOrder: builder.query({
      query: (orderId) => ({
        url: `/order/${orderId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.order],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ updateOrderStatusData, orderNumber }) => ({
        url: `/order/update-status/${orderNumber}`,
        method: "PATCH",
        body: updateOrderStatusData,
      }),
      invalidatesTags: [tagTypes.order],
    }),
    getRevinew: builder.query({
      query: () => ({
        url: "/order/revinew",
        method: "GET",
      }),
      providesTags: [tagTypes.order],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetBuyerOrderQuery,
  useGetAllOrderQuery,
  useGetSingleOrderQuery,
  useUpdateOrderStatusMutation,
  useGetRevinewQuery,
} = orderApi;
