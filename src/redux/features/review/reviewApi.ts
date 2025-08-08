import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../tagTypes";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (reviewData) => ({
        url: "/review/create-review",
        method: "POST",
        body: reviewData,
      }),
      invalidatesTags: [tagTypes.review],
    }),
    getSingleProductReview: builder.query({
      query: (productId) => ({
        url: `review/single-product-review/${productId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.review],
    }),
  }),
});

export const { useCreateReviewMutation, useGetSingleProductReviewQuery } =
  reviewApi;
