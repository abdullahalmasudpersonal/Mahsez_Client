import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../tagTypes";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBlog: builder.mutation({
      query: (blogData) => ({
        url: "/blog/create-blog",
        methods: "POST",
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
      query: (updateData) => ({
        url: `/blog/${updateData.id}`,
        method: "PATCH",
        body: updateData,
      }),
      invalidatesTags: [tagTypes.blog],
    }),
    deleteBlog: builder.mutation({
      query: (blogId) => ({
        url: `/${blogId}`,
        method: "DELETE",
      }),
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
