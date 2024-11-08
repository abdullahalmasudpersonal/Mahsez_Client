import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../tagTypes";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: [tagTypes.user, tagTypes.admin, tagTypes.buyer],
    }),
    updateMyProfile: builder.mutation({
      query: (profileData) => ({
        url: "/user/update-my-profile",
        method: "PATCH",
        body: profileData,
      }),
      invalidatesTags: [tagTypes.user, tagTypes.admin, tagTypes.buyer],
    }),
  }),
});

export const { useGetMyProfileQuery, useUpdateMyProfileMutation } = userApi;
