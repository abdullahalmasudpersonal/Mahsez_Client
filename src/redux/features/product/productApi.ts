import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../tagTypes";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProdcuts: builder.query({
      query: () => ({
        url: "/product",
        method: "GET",
      }),
      providesTags: [tagTypes.product],
    }),
    getSingleProdcut: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
    }),
    createProduct: builder.mutation({
      query: (productInfo) => ({
        url: "/product/create-product",
        method: "POST",
        body: productInfo,
      }),
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
  useGetProdcutsQuery,
  useGetSingleProdcutQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} = productApi;
