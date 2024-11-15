import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../tagTypes";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBlog: builder.mutation({
      query: (blogData) => ({
        url: "/blog/create-blog",
        method: "POST",
        body: blogData,
      }),
      invalidatesTags: [tagTypes.blog],
    }),
    getBlogs: builder.query({
      query: () => ({
        url: "/blog",
        method: "GET",
      }),
      providesTags: [tagTypes.blog],
    }),
    getSingleBlog: builder.query({
      query: (blogId) => ({
        url: `/blog/${blogId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog],
    }),
    updateBlog: builder.mutation({
      query: ({ formData: updateData, _id }) => ({
        url: `/blog/${_id}`,
        method: "PATCH",
        body: updateData,
      }),
      invalidatesTags: [tagTypes.blog],
    }),
    deleteBlog: builder.mutation({
      query: (blogId) => ({
        url: `/blog/${blogId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.blog],
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useGetBlogsQuery,
  useGetSingleBlogQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
