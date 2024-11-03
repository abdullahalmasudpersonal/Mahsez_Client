import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProdcuts: builder.query({
      query: () => ({
        url: "/product",
        method: "GET",
      }),
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
  }),
});

export const {
  useGetProdcutsQuery,
  useGetSingleProdcutQuery,
  useCreateProductMutation,
} = productApi;
