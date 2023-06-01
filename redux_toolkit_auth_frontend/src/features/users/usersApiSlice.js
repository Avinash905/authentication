import { apiSlice } from "../../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      // Cache users data in rtk query (default=60sec). We have to leave the component for at least 5sec. Within 5sec we can go to another page and come back to userslist page but it won't fetch new request. Only after 5secs of leaving the page and coming back it will send request again.
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;
