import { baseApi } from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (reviewData) => ({
        url: "/review/create-review",
        method: "POST",
        body: reviewData,
      }),
    }),
    getSingleProductReview: builder.query({
      query: (productId) => ({
        url: `review/single-product-review/${productId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateReviewMutation, useGetSingleProductReviewQuery } = reviewApi;
