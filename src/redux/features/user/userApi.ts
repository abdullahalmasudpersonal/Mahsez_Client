import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../tagTypes";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    updateMyProfile: builder.mutation({
      query: (profileData) => ({
        url: "/user/update-my-profile",
        method: "PATCH",
        body: profileData,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const { useGetMyProfileQuery, useUpdateMyProfileMutation } = userApi;
