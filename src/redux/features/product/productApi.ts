import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../tagTypes";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (searchTerm) => ({
        url: "/product",
        method: "GET",
        params: searchTerm ? { searchTerm } : {},
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
  useGetSingleProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
