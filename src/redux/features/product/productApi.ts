import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../tagTypes";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "/product",
        method: "GET",
      }),
      providesTags: [tagTypes.product],
    }),
    getProductsWithSearchFilter: builder.query({
      query: ({ searchTerm, limit, page }) => ({
        url: "/product/search-filter",
        method: "GET",
        params: {
          ...(searchTerm && { searchTerm }),
          ...(limit && { limit }),
          ...(page && { page }),
        },
      }),
      providesTags: [tagTypes.product],
    }),
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.product],
    }),
    createProduct: builder.mutation({
      query: (productInfo) => ({
        url: "/product/create-product",
        method: "POST",
        body: productInfo,
      }),
      invalidatesTags: [tagTypes.product],
    }),
    updateProduct: builder.mutation({
      query: ({ formData: productData, productId }) => ({
        url: `/product/${productId}`,
        method: "PATCH",
        body: productData,
      }),
      invalidatesTags: [tagTypes.product],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.product],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsWithSearchFilterQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
